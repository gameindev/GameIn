import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { SocialIntegration } from '../entities/social-integration.entity';
import { SocialIntegrationProvider } from './social-integration.provider';
import { ConnectionState, SocialPlatform } from '../enums/social-platform.enums';
import { ConnectionCheckResult, SocialIntegrationServiceInterface } from '../interfaces/social-integration-service.interface';
import { ActiveUserData } from '../../auth/interfaces/active-user-data.interface';
import { SocialAccountRollup } from '../entities/social-account-rollup.entity';
import { SocialPostMetric } from '../entities/social-post-metric.entity';
import { SocialSyncJob } from '../entities/social-sync-job.entity';
import { SocialMetricSnapshot } from '../entities/social-metric-snapshot.entity';

type ProviderMap = Partial<Record<SocialPlatform, SocialIntegrationServiceInterface>>;
const MAX_RECENT_POSTS = 40;

@Injectable()
export class SocialIntegrationService {
    private readonly logger = new Logger(SocialIntegrationService.name);

    constructor(
        @InjectRepository(SocialIntegration)
        private readonly integrationRepo: Repository<SocialIntegration>,
        @InjectRepository(SocialAccountRollup)
        private readonly rollupRepo: Repository<SocialAccountRollup>,
        @InjectRepository(SocialPostMetric)
        private readonly metricRepo: Repository<SocialPostMetric>,
        @InjectRepository(SocialSyncJob)
        private readonly syncRepo: Repository<SocialSyncJob>,
        @InjectRepository(SocialMetricSnapshot)
        private readonly metricSnapshotRepo: Repository<SocialMetricSnapshot>,
        private readonly integrationProvider: SocialIntegrationProvider,
        @Inject('SOCIAL_PROVIDER_MAP')
        private readonly providers: ProviderMap,
    ) { }

    private labelFor(state: ConnectionState): 'Add' | 'Connect' | 'Connected' {
        switch (state) {
            case 'ADD': return 'Add';
            case 'CONNECT': return 'Connect';
            default: return 'Connected';
        }
    }

    private isUnauthorized(err: unknown): boolean {
        // Covers 401/403 and common "invalid_grant" 400 shapes (axios + native fetch errors)
        const anyErr = err as any;
        const status = anyErr?.response?.status;
        const code = anyErr?.response?.data?.error;
        const msg = String(anyErr?.message ?? '');
        if (/\b401\b/.test(msg) || /\b403\b/.test(msg)) return true;
        return status === 401 || status === 403 || (status === 400 && code === 'invalid_grant');
    }

    private isRateLimited(err: unknown): boolean {
        return (err as any)?.response?.status === 429;
    }


    async checkConnection(userId: number, platform: SocialPlatform): Promise<ConnectionCheckResult> {
        // 1) No row at all => "ADD"
        const row = await this.integrationRepo.findOne({ where: { user: { id: userId }, platform } });
        if (!row) {
            return { user_id: userId, platform, state: 'ADD', label: this.labelFor('ADD') };
        }

        // 2) Need a provider implementation
        const provider = this.providers[platform];
        if (!provider) {
            this.logger.error(`No social provider registered for ${platform}`);
            return { user_id: userId, platform, state: 'CONNECT', label: this.labelFor('CONNECT'), warning: 'NO_PROVIDER' };
        }

        // 3) Probe with current access token
        try {
            const profile = await provider.probeProfile(row.access_token);
            const summary = provider.profileSummary?.(profile);
            return { user_id: userId, platform, state: 'CONNECTED', label: this.labelFor('CONNECTED'), summary, integration_id: row.id };
        } catch (err) {
            // 4) Try refresh on auth failure (if refresh_token + provider supports refresh)
            if (this.isUnauthorized(err) && row.refresh_token && typeof provider.refreshTokenIfNeeded === 'function') {
                try {
                    const refreshed = await provider.refreshTokenIfNeeded(row.id, row.refresh_token);
                    if (refreshed?.access_token) {
                        row.access_token = refreshed.access_token;
                        if (refreshed.refresh_token) row.refresh_token = refreshed.refresh_token;
                        const integration = await this.integrationRepo.save(row);

                        // Re-probe after refresh
                        try {
                            const profile = await provider.probeProfile(row.access_token);
                            const summary = provider.profileSummary?.(profile);
                            return { user_id: userId, platform, state: 'CONNECTED', label: this.labelFor('CONNECTED'), integration_id: integration.id, refreshed: true, summary };
                        } catch (err2) {
                            this.logger.warn(`Re-probe failed after refresh (${platform}): ${err2?.message ?? err2}`);
                        }
                    }
                } catch (refreshErr) {
                    this.logger.warn(`Refresh failed (${platform}): ${refreshErr?.message ?? refreshErr}`);
                }
            }

            // 5) Rate limited => token likely valid; keep "CONNECTED" but warn UI (e.g., grey tooltip)
            if (this.isRateLimited(err)) {
                return {
                    user_id: userId,
                    platform,
                    state: 'CONNECTED',
                    label: this.labelFor('CONNECTED'),
                    integration_id: row.id,
                    warning: 'RATE_LIMIT',
                };
            }

            // 6) Anything else => we have a row but it’s not usable => "CONNECT" (re-auth)
            return { user_id: userId, platform, state: 'CONNECT', label: this.labelFor('CONNECT') };
        }
    }


    async checkAll(userId: number, platforms: SocialPlatform[]): Promise<ConnectionCheckResult[]> {
        return Promise.all(platforms.map(p => this.checkConnection(userId, p)));
    }


    getAuthUrl(platform: SocialPlatform, user: ActiveUserData) {
        const provider = this.integrationProvider.getProvider(platform);
        return provider.getAuthUrl(user);
    }

    /**
     * OAuth redirect callback: exchange code, persist integration, run initial stats sync (best-effort).
     */
    async handleOAuthCallback(platform: SocialPlatform, code: string, state: string): Promise<number> {
        const provider = this.integrationProvider.getProvider(platform);
        const integrationId = await provider.handleCallback(code, state);
        try {
            await this.fetchStats(platform, integrationId);
        } catch (e) {
            this.logger.warn(`Initial sync after OAuth failed (${platform}): ${(e as Error)?.message ?? e}`);
        }
        return integrationId;
    }

    private normalizeRollup(platform: SocialPlatform, raw: any) {
        const posts = Array.isArray(raw?.posts) ? raw.posts : [];
        const totalLikes = posts.reduce((sum, p) => sum + Number(p?.like_count ?? 0), 0);
        const totalViews = posts.reduce((sum, p) => sum + Number(p?.view_count ?? 0), 0);
        const maxLikes = posts.length ? Math.max(...posts.map((p) => Number(p?.like_count ?? 0))) : 0;
        const maxViews = posts.length ? Math.max(...posts.map((p) => Number(p?.view_count ?? 0))) : 0;

        return {
            followers: Number(raw?.followers_total ?? raw?.followers ?? raw?.followersCount ?? 0),
            totalLikes: Number(raw?.accumulated_likes ?? raw?.totalLikes ?? totalLikes ?? 0),
            maxLikes: Number(raw?.highest_likes ?? raw?.maxLikes ?? raw?.topLiked?.likes ?? maxLikes ?? 0),
            totalViews: Number(raw?.accumulated_views ?? raw?.totalViews ?? totalViews ?? 0),
            maxViews: Number(raw?.highest_views ?? raw?.maxViews ?? raw?.topViewed?.views ?? maxViews ?? 0),
            sampledPostsCount: Number(raw?.sampled_posts_count ?? posts.length ?? 0),
            viewsDefinition: raw?.views_definition || (platform === SocialPlatform.X ? 'impressions' : 'views'),
            posts,
            nextCursor: raw?.next_cursor ?? null,
        };
    }

    private keepRecentPosts(posts: any[], limit = MAX_RECENT_POSTS): any[] {
        if (!Array.isArray(posts) || posts.length <= limit) return Array.isArray(posts) ? posts : [];
        const withIndex = posts.map((p, idx) => ({ p, idx }));
        withIndex.sort((a, b) => {
            const at = a.p?.posted_at ? new Date(a.p.posted_at).getTime() : 0;
            const bt = b.p?.posted_at ? new Date(b.p.posted_at).getTime() : 0;
            if (bt !== at) return bt - at;
            return a.idx - b.idx;
        });
        return withIndex.slice(0, limit).map(x => x.p);
    }

    private pickEngagementFromPost(post: any) {
        const p = post ?? {};
        return {
            comment_count: p.comment_count != null ? Number(p.comment_count) : undefined,
            share_count: p.share_count != null ? Number(p.share_count) : undefined,
            save_count: p.save_count != null ? Number(p.save_count) : undefined,
            retweet_count: p.retweet_count != null ? Number(p.retweet_count) : undefined,
            quote_count: p.quote_count != null ? Number(p.quote_count) : undefined,
            impressions: p.impressions != null ? Number(p.impressions) : undefined,
        };
    }

    private async persistPostMetrics(integration: SocialIntegration, platform: SocialPlatform, posts: any[]) {
        for (const post of posts) {
            const socialPostId = String(post?.id ?? post?.post_id ?? '');
            if (!socialPostId) continue;
            const eng = this.pickEngagementFromPost(post);
            const existing = await this.metricRepo.findOne({
                where: { integration: { id: integration.id }, social_post_id: socialPostId },
            });
            if (existing) {
                existing.like_count = Number(post?.like_count ?? existing.like_count ?? 0);
                existing.view_count = Number(post?.view_count ?? existing.view_count ?? 0);
                existing.posted_at = post?.posted_at ? new Date(post.posted_at) : existing.posted_at;
                existing.raw_payload = post?.raw ?? post ?? existing.raw_payload;
                if (eng.comment_count != null) existing.comment_count = eng.comment_count;
                if (eng.share_count != null) existing.share_count = eng.share_count;
                if (eng.save_count != null) existing.save_count = eng.save_count;
                if (eng.retweet_count != null) existing.retweet_count = eng.retweet_count;
                if (eng.quote_count != null) existing.quote_count = eng.quote_count;
                if (eng.impressions != null) existing.impressions = eng.impressions;
                await this.metricRepo.save(existing);
                continue;
            }
            const record = this.metricRepo.create({
                integration,
                platform,
                social_post_id: socialPostId,
                posted_at: post?.posted_at ? new Date(post.posted_at) : null,
                like_count: Number(post?.like_count ?? 0),
                view_count: Number(post?.view_count ?? 0),
                comment_count: eng.comment_count,
                share_count: eng.share_count,
                save_count: eng.save_count,
                retweet_count: eng.retweet_count,
                quote_count: eng.quote_count,
                impressions: eng.impressions,
                raw_payload: post?.raw ?? post ?? null,
            });
            await this.metricRepo.save(record);
        }

        // Keep metric table bounded to the latest N posts per integration.
        const all = await this.metricRepo.find({
            where: { integration: { id: integration.id } },
            order: { posted_at: 'DESC', updated_at: 'DESC', id: 'DESC' },
        });
        if (all.length > MAX_RECENT_POSTS) {
            const remove = all.slice(MAX_RECENT_POSTS);
            if (remove.length) {
                await this.metricRepo.remove(remove);
            }
        }
    }

    private async upsertRollup(integration: SocialIntegration, normalized: ReturnType<SocialIntegrationService['normalizeRollup']>) {
        let rollup = await this.rollupRepo.findOne({ where: { integration: { id: integration.id } } });
        if (!rollup) {
            rollup = this.rollupRepo.create({
                integration,
                aggregation_window: 'all_fetched',
            });
        }
        rollup.followers_or_subscribers = normalized.followers;
        rollup.total_likes = normalized.totalLikes;
        rollup.max_likes = normalized.maxLikes;
        rollup.total_views = normalized.totalViews;
        rollup.max_views = normalized.maxViews;
        rollup.sampled_posts_count = normalized.sampledPostsCount;
        rollup.views_definition = normalized.viewsDefinition;
        rollup.last_synced_at = new Date();
        return this.rollupRepo.save(rollup);
    }

    private utcCalendarDate(d = new Date()): Date {
        return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
    }

    private async upsertDailyMetricSnapshot(
        integration: SocialIntegration,
        totals: { followers: number; totalLikes: number; totalViews: number },
        source: string,
    ) {
        const snapshotDate = this.utcCalendarDate();
        let row = await this.metricSnapshotRepo.findOne({
            where: {
                integration: { id: integration.id },
                snapshotDate: Equal(snapshotDate),
            },
        });
        if (!row) {
            row = this.metricSnapshotRepo.create({
                integration,
                snapshotDate,
                source,
            });
        }
        row.followers_or_subscribers = totals.followers;
        row.total_likes = totals.totalLikes;
        row.total_views = totals.totalViews;
        row.source = source;
        await this.metricSnapshotRepo.save(row);
    }

    /** Used by daily cron: persist rollup into today's snapshot without calling external APIs */
    async upsertDailySnapshotFromRollup(integrationId: number): Promise<void> {
        const integration = await this.integrationRepo.findOne({ where: { id: integrationId } });
        const rollup = await this.rollupRepo.findOne({ where: { integration: { id: integrationId } } });
        if (!integration || !rollup) return;
        await this.upsertDailyMetricSnapshot(
            integration,
            {
                followers: Number(rollup.followers_or_subscribers ?? 0),
                totalLikes: Number(rollup.total_likes ?? 0),
                totalViews: Number(rollup.total_views ?? 0),
            },
            'scheduled_daily',
        );
    }

    async fetchStats(platform: SocialPlatform, integrationId: number, userId?: number) {
        const provider = this.integrationProvider.getProvider(platform);
        const integration = await this.integrationRepo.findOne({ where: { id: integrationId }, relations: ['user'] });
        if (!integration) throw new Error('Integration not found');
        if (userId && integration.user?.id !== userId) throw new Error('Integration does not belong to user');
        try {
            const raw = await provider.fetchAndStoreStats(integrationId);
            const limitedRaw = {
                ...raw,
                posts: this.keepRecentPosts(Array.isArray(raw?.posts) ? raw.posts : []),
                sampled_posts_count: Math.min(
                    Number(raw?.sampled_posts_count ?? (Array.isArray(raw?.posts) ? raw.posts.length : 0) ?? 0),
                    MAX_RECENT_POSTS,
                ),
            };
            const normalized = this.normalizeRollup(platform, limitedRaw);
            if (normalized.posts.length) {
                await this.persistPostMetrics(integration, platform, normalized.posts);
            }
            await this.upsertRollup(integration, normalized);
            await this.upsertDailyMetricSnapshot(
                integration,
                {
                    followers: normalized.followers,
                    totalLikes: normalized.totalLikes,
                    totalViews: normalized.totalViews,
                },
                'sync_success',
            );
            await this.syncRepo.save(this.syncRepo.create({
                integration,
                platform,
                status: 'SUCCESS',
                cursor: normalized.nextCursor ? String(normalized.nextCursor) : null,
                last_success_at: new Date(),
                last_error: null,
                retry_count: 0,
            }));
            return {
                followers: normalized.followers,
                accumulated_likes: normalized.totalLikes,
                highest_likes: normalized.maxLikes,
                accumulated_views: normalized.totalViews,
                highest_views: normalized.maxViews,
                sampled_posts_count: normalized.sampledPostsCount,
                aggregation_window: 'all_fetched',
                views_definition: normalized.viewsDefinition,
                sync_status: 'SUCCESS',
                lifetime_likes: limitedRaw?.lifetime_likes ?? null,
            };
        } catch (err) {
            this.logger.warn(`Live stats fetch failed (${platform}, integration=${integrationId}); trying cached rollup: ${(err as Error)?.message ?? err}`);
            const cachedRollup = await this.rollupRepo.findOne({
                where: { integration: { id: integrationId } },
            });
            if (!cachedRollup) throw err;
            return {
                followers: cachedRollup.followers_or_subscribers ?? 0,
                accumulated_likes: cachedRollup.total_likes ?? 0,
                highest_likes: cachedRollup.max_likes ?? 0,
                accumulated_views: cachedRollup.total_views ?? 0,
                highest_views: cachedRollup.max_views ?? 0,
                sampled_posts_count: cachedRollup.sampled_posts_count ?? 0,
                aggregation_window: cachedRollup.aggregation_window ?? 'all_fetched',
                views_definition: cachedRollup.views_definition ?? (platform === SocialPlatform.X ? 'impressions' : 'views'),
                sync_status: 'CACHED_FALLBACK',
                lifetime_likes: null,
            };
        }
    }

    async syncPlatform(userId: number, platform: SocialPlatform) {
        const integration = await this.integrationRepo.findOne({
            where: { user: { id: userId }, platform },
            relations: ['user'],
        });
        if (!integration) {
            throw new Error('Platform not connected');
        }
        const raw = await this.fetchStats(platform, integration.id, userId);
        return this.normalizeStats(platform, raw);
    }

    async disconnect(userId: number, platform: SocialPlatform) {
        const integration = await this.integrationRepo.findOne({
            where: { user: { id: userId }, platform },
        });
        if (!integration) return { ok: true };

        const provider = this.providers[platform];
        if (provider?.revokeToken) {
            try {
                await provider.revokeToken(integration.access_token);
            } catch (error) {
                this.logger.warn(`Token revoke failed for ${platform}: ${(error as Error)?.message}`);
            }
        }

        await this.integrationRepo.remove(integration);
        return { ok: true };
    }

    /**
     * Normalize platform-specific stats for the frontend (accumulated + highest where available).
     */
    normalizeStats(platform: SocialPlatform, raw: any): {
        followers?: number | null;
        likes?: number | null;
        views?: number | null;
        highestLikes?: number | null;
        highestViews?: number | null;
        lifetimeLikes?: number | null;
        sampledPostsCount?: number | null;
        viewsDefinition?: string | null;
        syncStatus?: string | null;
        connectionsCount?: number | null;
    } {
        if (raw == null) return {};

        const base = {
            highestLikes: raw.highest_likes ?? raw.maxLikes ?? null,
            highestViews: raw.highest_views ?? raw.maxViews ?? null,
            lifetimeLikes: raw.lifetime_likes ?? null,
            sampledPostsCount: raw.sampled_posts_count ?? null,
            viewsDefinition: raw.views_definition ?? null,
            syncStatus: raw.sync_status ?? null,
        };

        switch (platform) {
            case SocialPlatform.TWITCH: {
                const followers = raw.followers ?? raw.followersCount ?? null;
                const views = raw.accumulated_views ?? raw.viewCount ?? raw.mostViewed?.views ?? null;
                return { ...base, followers, likes: null, views };
            }
            case SocialPlatform.X: {
                const followers = raw.followers ?? raw.followers_total ?? raw.public_metrics?.followers_count ?? null;
                const likes = raw.accumulated_likes ?? raw.topLiked?.likes ?? raw.totalLikes ?? null;
                const views = raw.accumulated_views ?? raw.topViewed?.views ?? raw.totalViews ?? null;
                return { ...base, followers, likes: likes ?? null, views: views ?? null };
            }
            case SocialPlatform.YOUTUBE: {
                const followers = raw.followers ?? raw.followers_total ?? null;
                const views = raw.accumulated_views ?? raw.views ?? null;
                return { ...base, followers, likes: raw.accumulated_likes ?? raw.likes ?? null, views };
            }
            case SocialPlatform.TIKTOK:
            case SocialPlatform.INSTAGRAM: {
                return {
                    ...base,
                    followers: raw.followers ?? raw.followers_total ?? null,
                    likes: raw.accumulated_likes ?? raw.totalLikes ?? null,
                    views: raw.accumulated_views ?? raw.totalViews ?? null,
                };
            }
            default:
                return { ...base };
        }
    }

    async getPublicStatsByUser(userId: number) {
        const rows = await this.rollupRepo.find({
            where: { integration: { user: { id: userId } } },
            relations: ['integration', 'integration.user'],
        });

        const result: Record<string, ReturnType<SocialIntegrationService['normalizeStats']>> = {};
        for (const row of rows) {
            const platform = row.integration?.platform as SocialPlatform | undefined;
            if (!platform) continue;
            const raw = {
                followers: Number(row.followers_or_subscribers ?? 0),
                accumulated_likes: Number(row.total_likes ?? 0),
                highest_likes: Number(row.max_likes ?? 0),
                accumulated_views: Number(row.total_views ?? 0),
                highest_views: Number(row.max_views ?? 0),
                sampled_posts_count: Number(row.sampled_posts_count ?? 0),
                views_definition: row.views_definition ?? null,
                sync_status: row.last_synced_at ? 'CACHED_PUBLIC' : null,
            };
            result[platform] = this.normalizeStats(platform, raw);
        }
        return result;
    }
}
