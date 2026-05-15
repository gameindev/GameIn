import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { User } from '../users/user.entity';
import { UserType } from '../users/enums/user-type.enums';
import { ActiveUserData } from '../auth/interfaces/active-user-data.interface';
import { SocialMetricSnapshot } from '../social-integration/entities/social-metric-snapshot.entity';
import { SocialPostMetric } from '../social-integration/entities/social-post-metric.entity';
import { SocialAccountRollup } from '../social-integration/entities/social-account-rollup.entity';
import { Invoice } from '../invoices/invoice.entity';
import { InvoiceStatus } from '../invoices/enums/invoice-status.enum';
import { UserFollow } from '../user-follow/user-follow.entity';
import { OfferingOrder } from '../offerings-order/offering-order.entity';

@Injectable()
export class AnalyticsService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
        @InjectRepository(SocialMetricSnapshot)
        private readonly snapshotRepo: Repository<SocialMetricSnapshot>,
        @InjectRepository(SocialPostMetric)
        private readonly postMetricRepo: Repository<SocialPostMetric>,
        @InjectRepository(SocialAccountRollup)
        private readonly rollupRepo: Repository<SocialAccountRollup>,
        @InjectRepository(Invoice)
        private readonly invoiceRepo: Repository<Invoice>,
        @InjectRepository(UserFollow)
        private readonly userFollowRepo: Repository<UserFollow>,
    ) {}

    private ageFromDob(dob: Date | string | null | undefined): number | null {
        if (!dob) return null;
        const d = typeof dob === 'string' ? new Date(dob) : dob;
        if (Number.isNaN(d.getTime())) return null;
        const today = new Date();
        let age = today.getFullYear() - d.getFullYear();
        const m = today.getMonth() - d.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age--;
        return age;
    }

    private bucketAge(age: number | null): string {
        if (age == null || age < 13) return 'unknown';
        if (age <= 17) return '13-17';
        if (age <= 24) return '18-24';
        if (age <= 34) return '25-34';
        if (age <= 44) return '35-44';
        return '45+';
    }

    private inc(map: Map<string, number>, key: string) {
        const k = key?.trim() || 'unknown';
        map.set(k, (map.get(k) ?? 0) + 1);
    }

    private mapToBuckets(m: Map<string, number>) {
        return [...m.entries()]
            .map(([label, count]) => ({ label, count }))
            .sort((a, b) => a.label.localeCompare(b.label));
    }

    /** Optional subject for cross-profile stats; omit or invalid → viewer’s own id */
    private parseOptionalForUserId(raw?: string): number | undefined {
        if (raw == null || raw === '') return undefined;
        const n = parseInt(String(raw), 10);
        if (!Number.isFinite(n) || n < 1) return undefined;
        return n;
    }

    /**
     * Paid sponsorship totals, income charts, and ROI are owner-private (not shown on public profile stats).
     * Admins may pass `forUserId` for support.
     */
    private assertSponsorshipFinancialViewer(viewer: ActiveUserData, subjectUserId: number): void {
        if (viewer.user_type === UserType.ADMIN) return;
        if (subjectUserId !== viewer.sub) {
            throw new ForbiddenException(
                'Sponsorship revenue and payment analytics are only available to the account owner',
            );
        }
    }

    private async assertViewerMayAccessSubject(viewer: ActiveUserData, subjectUserId: number): Promise<void> {
        if (subjectUserId === viewer.sub) return;
        if (viewer.user_type === UserType.ADMIN) return;

        const target = await this.userRepo.findOne({ where: { id: subjectUserId } });
        if (!target) {
            throw new NotFoundException('User not found');
        }
        if (target.user_type === UserType.ADMIN) {
            throw new ForbiddenException('Analytics for this account are not available');
        }
    }

    private canRequestPlatformAggregate(viewer: ActiveUserData): boolean {
        return (
            viewer.user_type === UserType.ADMIN ||
            viewer.user_type === UserType.CREATOR ||
            viewer.user_type === UserType.BRAND
        );
    }

    private async buildPlatformDemographics() {
        const rows = await this.userRepo.find({
            relations: ['creator_profile', 'brand_profile'],
        });
        const creatorsAge = new Map<string, number>();
        const creatorsGender = new Map<string, number>();
        const creatorsCountry = new Map<string, number>();
        const brandsAge = new Map<string, number>();
        const brandsCountry = new Map<string, number>();

        for (const u of rows) {
            const ageBucket = this.bucketAge(this.ageFromDob(u.date_of_birth));
            if (u.user_type === UserType.CREATOR && u.creator_profile) {
                this.inc(creatorsAge, ageBucket);
                if (u.creator_profile.gender) this.inc(creatorsGender, String(u.creator_profile.gender));
                if (u.creator_profile.country) this.inc(creatorsCountry, String(u.creator_profile.country));
            }
            if (u.user_type === UserType.BRAND && u.brand_profile) {
                this.inc(brandsAge, ageBucket);
                if (u.brand_profile.country) this.inc(brandsCountry, String(u.brand_profile.country));
            }
        }

        return {
            scope: 'platform' as const,
            totals: { users: rows.length },
            creators: {
                age_buckets: this.mapToBuckets(creatorsAge),
                gender: this.mapToBuckets(creatorsGender),
                countries: this.mapToBuckets(creatorsCountry),
            },
            brands: {
                age_buckets: this.mapToBuckets(brandsAge),
                countries: this.mapToBuckets(brandsCountry),
            },
            definitions: {
                age: 'Derived from users.date_of_birth where present',
                gender: 'creator_profile.gender only (brands may omit)',
                country: 'creator_profile.country / brand_profile.country',
            },
        };
    }

    /**
     * Demographics of GameIn accounts that follow `subjectId` (user_follow.following_id),
     * plus brand-only follower breakdown by brand country.
     */
    private async buildFollowerDemographics(subjectId: number) {
        const follows = await this.userFollowRepo
            .createQueryBuilder('uf')
            .innerJoinAndSelect('uf.follower', 'follower')
            .leftJoinAndSelect('follower.creator_profile', 'creator_profile')
            .leftJoinAndSelect('follower.brand_profile', 'brand_profile')
            .where('uf.following_id = :sid', { sid: subjectId })
            .andWhere('uf.deleted_at IS NULL')
            .andWhere('follower.deleted_at IS NULL')
            .getMany();

        const followerAge = new Map<string, number>();
        const followerGender = new Map<string, number>();
        const followerCountry = new Map<string, number>();
        const brandFollowerCountry = new Map<string, number>();

        for (const row of follows) {
            const f = row.follower;
            if (!f) continue;

            const ageBucket = this.bucketAge(this.ageFromDob(f.date_of_birth));
            this.inc(followerAge, ageBucket);

            if (f.user_type === UserType.CREATOR) {
                if (f.creator_profile?.gender) {
                    this.inc(followerGender, String(f.creator_profile.gender));
                } else {
                    this.inc(followerGender, 'Not specified');
                }
            }
            /* Brand (and other non-creator) followers have no creator gender — omit from gender chart; use Brands card. */


            let country: string | null = null;
            if (f.user_type === UserType.CREATOR && f.creator_profile?.country) {
                country = String(f.creator_profile.country);
            } else if (f.user_type === UserType.BRAND && f.brand_profile?.country) {
                country = String(f.brand_profile.country);
            }
            this.inc(followerCountry, country ?? 'Unknown');

            if (f.user_type === UserType.BRAND && f.brand_profile?.country) {
                this.inc(brandFollowerCountry, String(f.brand_profile.country));
            }
        }

        return {
            scope: 'followers' as const,
            subject_user_id: subjectId,
            totals: { followers: follows.length },
            creators: {
                age_buckets: this.mapToBuckets(followerAge),
                gender: this.mapToBuckets(followerGender),
                countries: this.mapToBuckets(followerCountry),
            },
            brands: {
                age_buckets: [],
                countries: this.mapToBuckets(brandFollowerCountry),
            },
            definitions: {
                age: 'Age buckets from follower date_of_birth (GameIn users following the subject)',
                gender: 'Creator followers only, from creator_profile.gender (missing → Not specified). Brand followers are excluded; see Brands card.',
                country: 'Follower creator_profile.country or brand_profile.country',
                brands: 'Brand-type followers only, grouped by brand_profile.country',
            },
        };
    }

    private async getSelfDemographicsSlice(userId: number) {
        const self = await this.userRepo.findOne({
            where: { id: userId },
            relations: ['creator_profile', 'brand_profile'],
        });
        if (!self) {
            throw new NotFoundException('User not found');
        }

        return {
            scope: 'self' as const,
            age_bucket: this.bucketAge(this.ageFromDob(self.date_of_birth)),
            gender: self.creator_profile?.gender ?? null,
            country: self.creator_profile?.country ?? self.brand_profile?.country ?? null,
            language: self.language ?? null,
            user_type: self.user_type,
        };
    }

    /**
     * @param aggregate — `platform` returns GameIn-wide aggregates (creator, brand, or admin only).
     * @param forUserId — subject user id (defaults to JWT user). For creator/brand/admin viewers, returns
     *   follower demographics for that subject; otherwise returns the subject’s self profile slice.
     */
    async getGameinDemographics(
        user: ActiveUserData,
        opts?: { forUserId?: number; aggregate?: 'platform' },
    ) {
        const aggregate = opts?.aggregate === 'platform' ? 'platform' : undefined;
        const forUserId = opts?.forUserId;

        if (aggregate === 'platform') {
            if (!this.canRequestPlatformAggregate(user)) {
                throw new ForbiddenException('Platform demographics are not available for this account type');
            }
            return this.buildPlatformDemographics();
        }

        const subjectId = forUserId ?? user.sub;
        await this.assertViewerMayAccessSubject(user, subjectId);

        if (this.canRequestPlatformAggregate(user)) {
            return this.buildFollowerDemographics(subjectId);
        }

        return this.getSelfDemographicsSlice(subjectId);
    }

    async getSocialTrends(user: ActiveUserData, days: number, forUserId?: number) {
        const subjectId = forUserId ?? user.sub;
        await this.assertViewerMayAccessSubject(user, subjectId);

        const from = new Date();
        from.setUTCDate(from.getUTCDate() - days);
        from.setUTCHours(0, 0, 0, 0);

        const rows = await this.snapshotRepo
            .createQueryBuilder('s')
            .leftJoinAndSelect('s.integration', 'i')
            .where('i.user_id = :uid', { uid: subjectId })
            .andWhere('s.snapshot_date >= :from', { from })
            .orderBy('s.snapshot_date', 'ASC')
            .addOrderBy('i.platform', 'ASC')
            .getMany();

        const byDay = new Map<string, { date: string; followers: number; views: number; likes: number }>();
        for (const row of rows) {
            const d =
                row.snapshotDate instanceof Date ? row.snapshotDate : new Date(row.snapshotDate as unknown as string);
            const key = d.toISOString().slice(0, 10);
            const cur = byDay.get(key) ?? { date: key, followers: 0, views: 0, likes: 0 };
            cur.followers += Number(row.followers_or_subscribers ?? 0);
            cur.views += Number(row.total_views ?? 0);
            cur.likes += Number(row.total_likes ?? 0);
            byDay.set(key, cur);
        }

        const series = [...byDay.values()].sort((a, b) => a.date.localeCompare(b.date));

        const detail_by_platform = rows.map((r) => {
            const d =
                r.snapshotDate instanceof Date ? r.snapshotDate : new Date(r.snapshotDate as unknown as string);
            return {
                date: d.toISOString().slice(0, 10),
                platform: r.integration?.platform ?? null,
                followers: Number(r.followers_or_subscribers ?? 0),
                views: Number(r.total_views ?? 0),
                likes: Number(r.total_likes ?? 0),
                source: r.source,
            };
        });

        return {
            days,
            subject_user_id: subjectId,
            metric_definitions: {
                followers: 'Sum of connected integrations snapshot followers per day (UTC)',
                views: 'Sum of rollup total_views stored at snapshot time',
                likes: 'Sum of rollup total_likes stored at snapshot time',
            },
            series,
            detail_by_platform,
        };
    }

    async getSocialEngagement(user: ActiveUserData, forUserId?: number) {
        const subjectId = forUserId ?? user.sub;
        await this.assertViewerMayAccessSubject(user, subjectId);

        const followersRow = await this.rollupRepo
            .createQueryBuilder('r')
            .innerJoin('r.integration', 'i')
            .where('i.user_id = :uid', { uid: subjectId })
            .select('COALESCE(SUM(r.followers_or_subscribers), 0)', 'followers')
            .getRawOne<{ followers: string }>();

        const mRow = await this.postMetricRepo
            .createQueryBuilder('m')
            .innerJoin('m.integration', 'i')
            .where('i.user_id = :uid', { uid: subjectId })
            .select('COALESCE(SUM(m.like_count), 0)', 'likes')
            .addSelect('COALESCE(SUM(m.view_count), 0)', 'views')
            .addSelect('COALESCE(SUM(m.comment_count), 0)', 'comments')
            .addSelect('COALESCE(SUM(m.share_count), 0)', 'shares')
            .addSelect('COALESCE(SUM(m.save_count), 0)', 'saves')
            .addSelect('COALESCE(SUM(m.retweet_count), 0)', 'retweets')
            .addSelect('COALESCE(SUM(m.quote_count), 0)', 'quotes')
            .getRawOne<Record<string, string>>();

        const followers = Number(followersRow?.followers ?? 0);
        const likes = Number(mRow?.likes ?? 0);
        const views = Number(mRow?.views ?? 0);
        const comments = Number(mRow?.comments ?? 0);
        const shares = Number(mRow?.shares ?? 0);
        const saves = Number(mRow?.saves ?? 0);
        const retweets = Number(mRow?.retweets ?? 0);
        const quotes = Number(mRow?.quotes ?? 0);

        const engagement_total = likes + comments + shares + saves + retweets + quotes;

        return {
            subject_user_id: subjectId,
            totals: {
                followers,
                likes,
                views,
                comments,
                shares,
                saves,
                retweets,
                quotes,
                engagement_total,
            },
            rates: {
                engagement_rate_followers: followers > 0 ? engagement_total / followers : null,
                engagement_rate_views: views > 0 ? engagement_total / views : null,
            },
            metric_definitions: {
                engagement_total: 'likes + comments + shares + saves + retweets + quotes (only stored metrics)',
                engagement_rate_followers: 'engagement_total / sum of rollup followers across integrations',
                engagement_rate_views: 'engagement_total / sum of sampled post view_count (approximate)',
            },
        };
    }

    async getSponsorshipsSummary(user: ActiveUserData, days: number, forUserId?: number) {
        if (
            user.user_type !== UserType.CREATOR &&
            user.user_type !== UserType.BRAND &&
            user.user_type !== UserType.ADMIN
        ) {
            throw new ForbiddenException('Only creators, brands, and admins can view sponsorship summaries');
        }

        const subjectId = forUserId ?? user.sub;
        this.assertSponsorshipFinancialViewer(user, subjectId);
        await this.assertViewerMayAccessSubject(user, subjectId);

        const subject = await this.userRepo.findOne({ where: { id: subjectId } });
        if (!subject) {
            throw new NotFoundException('User not found');
        }
        if (subject.user_type !== UserType.CREATOR && subject.user_type !== UserType.BRAND) {
            throw new ForbiddenException('Sponsorship summary is only available for creator and brand profiles');
        }

        const from = new Date();
        from.setUTCDate(from.getUTCDate() - days);
        from.setUTCHours(0, 0, 0, 0);

        const qb = this.invoiceRepo
            .createQueryBuilder('inv')
            .innerJoinAndSelect('inv.order', 'o')
            .where('inv.status = :paid', { paid: InvoiceStatus.PAID })
            .andWhere('o.created_at >= :from', { from })
            .andWhere('inv.deleted_at IS NULL')
            .andWhere('o.deleted_at IS NULL');

        if (subject.user_type === UserType.CREATOR) {
            qb.andWhere('o.creator_id = :uid', { uid: subjectId });
        } else {
            qb.andWhere('o.brand_id = :uid', { uid: subjectId });
        }

        const agg = await qb
            .select('COALESCE(SUM(o.total), 0)', 'total_revenue')
            .addSelect('COUNT(inv.id)', 'paid_orders')
            .getRawOne<{ total_revenue: string; paid_orders: string }>();

        const rollupSum = await this.rollupRepo
            .createQueryBuilder('r')
            .innerJoin('r.integration', 'i')
            .where('i.user_id = :uid', { uid: subjectId })
            .select('COALESCE(SUM(r.total_views), 0)', 'sum_views')
            .getRawOne<{ sum_views: string }>();

        const revenue = Number(agg?.total_revenue ?? 0);
        const estimated_views = Number(rollupSum?.sum_views ?? 0);

        return {
            subject_user_id: subjectId,
            window_days: days,
            paid_orders: Number(agg?.paid_orders ?? 0),
            total_revenue: revenue,
            currency_note: 'Uses offering_order.total for matched paid invoices',
            estimated_views_from_social_rollups: estimated_views,
            roi_proxy_revenue_per_view: estimated_views > 0 ? revenue / estimated_views : null,
            metric_definitions: {
                roi_proxy:
                    'total_revenue from paid invoices in window / sum of social_account_rollups.total_views for subject user integrations (rough proxy)',
            },
        };
    }

    /**
     * Owner-private charts: income marked paid today (UTC), last-30-day paid revenue and order counts.
     * Uses `invoice.updated_at` when status is PAID as the payment-time proxy (no separate paid_at column).
     */
    async getSponsorshipPrivateTracking(user: ActiveUserData, forUserId?: number) {
        if (
            user.user_type !== UserType.CREATOR &&
            user.user_type !== UserType.BRAND &&
            user.user_type !== UserType.ADMIN
        ) {
            throw new ForbiddenException('Only creators, brands, and admins can view sponsorship tracking');
        }

        const subjectId = forUserId ?? user.sub;
        this.assertSponsorshipFinancialViewer(user, subjectId);
        await this.assertViewerMayAccessSubject(user, subjectId);

        const subject = await this.userRepo.findOne({ where: { id: subjectId } });
        if (!subject) {
            throw new NotFoundException('User not found');
        }
        if (subject.user_type !== UserType.CREATOR && subject.user_type !== UserType.BRAND) {
            throw new ForbiddenException('Sponsorship tracking is only available for creator and brand profiles');
        }

        const dayStartUtc = new Date();
        dayStartUtc.setUTCHours(0, 0, 0, 0);
        const dayEndUtc = new Date(dayStartUtc);
        dayEndUtc.setUTCDate(dayEndUtc.getUTCDate() + 1);

        const from30Utc = new Date(dayStartUtc);
        from30Utc.setUTCDate(from30Utc.getUTCDate() - 29);

        const applySubject = (qb: SelectQueryBuilder<Invoice>) => {
            if (subject.user_type === UserType.CREATOR) {
                qb.andWhere('ord.creator_id = :uid', { uid: subjectId });
            } else {
                qb.andWhere('ord.brand_id = :uid', { uid: subjectId });
            }
            return qb;
        };

        const hourExpr =
            "CAST(FLOOR(EXTRACT(HOUR FROM (inv.updated_at AT TIME ZONE 'UTC'))) AS INTEGER)";

        const hourlyRows = await applySubject(
            this.invoiceRepo
                .createQueryBuilder('inv')
                .innerJoin(OfferingOrder, 'ord', 'ord.id = inv.order_id')
                .where('inv.status = :paid', { paid: InvoiceStatus.PAID })
                .andWhere('inv.deleted_at IS NULL')
                .andWhere('ord.deleted_at IS NULL')
                .andWhere('inv.updated_at >= :dayStart', { dayStart: dayStartUtc })
                .andWhere('inv.updated_at < :dayEnd', { dayEnd: dayEndUtc }),
        )
            .select(hourExpr, 'hour')
            .addSelect('COALESCE(SUM(ord.total), 0)', 'total')
            .groupBy(hourExpr)
            .getRawMany<{ hour: string; total: string }>();

        const hourMap = new Map<number, number>();
        for (const row of hourlyRows) {
            const h = Number(row.hour);
            if (!Number.isFinite(h)) continue;
            hourMap.set(h, Number(row.total) || 0);
        }
        const hourly = Array.from({ length: 24 }, (_, hour) => ({
            hour,
            amount: hourMap.get(hour) ?? 0,
            label: hour < 12 ? (hour === 0 ? '12am' : `${hour}am`) : hour === 12 ? '12pm' : `${hour - 12}pm`,
        }));
        const income_today_total = hourly.reduce((s, b) => s + b.amount, 0);

        const dayKeyExpr = "TO_CHAR((inv.updated_at AT TIME ZONE 'UTC'), 'YYYY-MM-DD')";

        const dailyRows = await applySubject(
            this.invoiceRepo
                .createQueryBuilder('inv')
                .innerJoin(OfferingOrder, 'ord', 'ord.id = inv.order_id')
                .where('inv.status = :paid', { paid: InvoiceStatus.PAID })
                .andWhere('inv.deleted_at IS NULL')
                .andWhere('ord.deleted_at IS NULL')
                .andWhere('inv.updated_at >= :from30', { from30: from30Utc }),
        )
            .select(dayKeyExpr, 'day')
            .addSelect('COALESCE(SUM(ord.total), 0)', 'revenue')
            .addSelect('COUNT(inv.id)', 'paid_orders')
            .groupBy(dayKeyExpr)
            .orderBy(dayKeyExpr, 'ASC')
            .getRawMany<{ day: string; revenue: string; paid_orders: string }>();

        const byDay = new Map<string, { revenue: number; paid_orders: number }>();
        for (const r of dailyRows) {
            byDay.set(r.day, {
                revenue: Number(r.revenue) || 0,
                paid_orders: Number(r.paid_orders) || 0,
            });
        }

        const series_30d: { date: string; revenue: number; paid_orders: number }[] = [];
        for (let i = 0; i < 30; i++) {
            const d = new Date(from30Utc);
            d.setUTCDate(d.getUTCDate() + i);
            const key = d.toISOString().slice(0, 10);
            const row = byDay.get(key) ?? { revenue: 0, paid_orders: 0 };
            series_30d.push({ date: key, revenue: row.revenue, paid_orders: row.paid_orders });
        }

        return {
            subject_user_id: subjectId,
            income_today: {
                date_utc: dayStartUtc.toISOString().slice(0, 10),
                total: income_today_total,
                hourly,
            },
            series_30d,
            metric_definitions: {
                income_today:
                    'Sum of offering_order.total for invoices marked PAID where invoice.updated_at falls on the current UTC calendar day (proxy for payment time).',
                series_30d:
                    'Daily sums of paid invoice order totals and paid invoice counts for the last 30 UTC days, grouped by invoice.updated_at date.',
            },
        };
    }
}
