import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ActiveUser } from '../auth/decorators/active-user.decorator';
import { ActiveUserData } from '../auth/interfaces/active-user-data.interface';
import { AnalyticsService } from './analytics.service';

function parseOptionalPositiveInt(raw?: string): number | undefined {
    if (raw == null || raw === '') return undefined;
    const n = parseInt(String(raw), 10);
    if (!Number.isFinite(n) || n < 1) return undefined;
    return n;
}

@ApiTags('Analytics')
@Controller('analytics')
@ApiBearerAuth()
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) {}

    @Get('gamein-demographics')
    @ApiOperation({
        summary:
            'GameIn demographics: self profile slice, follower aggregates for a subject user, or optional platform-wide aggregate',
    })
    @ApiQuery({
        name: 'forUserId',
        required: false,
        description:
            'Subject user id (defaults to current user). Creators, brands, and admins receive follower demographics for this user unless aggregate=platform.',
    })
    @ApiQuery({
        name: 'aggregate',
        required: false,
        description: 'Set to `platform` for marketplace-wide aggregates (creator, brand, or admin only)',
    })
    getGameinDemographics(
        @ActiveUser() user: ActiveUserData,
        @Query('forUserId') forUserId?: string,
        @Query('aggregate') aggregate?: string,
    ) {
        return this.analyticsService.getGameinDemographics(user, {
            forUserId: parseOptionalPositiveInt(forUserId),
            aggregate: aggregate === 'platform' ? 'platform' : undefined,
        });
    }

    @Get('social/trends')
    @ApiOperation({ summary: 'Daily social metric snapshots for a user’s connected integrations' })
    @ApiQuery({ name: 'days', required: false })
    @ApiQuery({ name: 'forUserId', required: false, description: 'Profile user id (defaults to current user)' })
    getSocialTrends(@ActiveUser() user: ActiveUserData, @Query('days') days?: string, @Query('forUserId') forUserId?: string) {
        const n = Math.min(Math.max(parseInt(days ?? '30', 10) || 30, 1), 365);
        return this.analyticsService.getSocialTrends(user, n, parseOptionalPositiveInt(forUserId));
    }

    @Get('social/engagement')
    @ApiOperation({ summary: 'Aggregated post engagement across connected social integrations' })
    @ApiQuery({ name: 'forUserId', required: false, description: 'Profile user id (defaults to current user)' })
    getSocialEngagement(@ActiveUser() user: ActiveUserData, @Query('forUserId') forUserId?: string) {
        return this.analyticsService.getSocialEngagement(user, parseOptionalPositiveInt(forUserId));
    }

    @Get('sponsorships-summary')
    @ApiOperation({ summary: 'Paid order revenue vs social views proxy (subject user; defaults to current user)' })
    @ApiQuery({ name: 'days', required: false })
    @ApiQuery({ name: 'forUserId', required: false, description: 'Profile user id (defaults to current user)' })
    getSponsorshipsSummary(
        @ActiveUser() user: ActiveUserData,
        @Query('days') days?: string,
        @Query('forUserId') forUserId?: string,
    ) {
        const n = Math.min(Math.max(parseInt(days ?? '365', 10) || 365, 1), 3650);
        return this.analyticsService.getSponsorshipsSummary(user, n, parseOptionalPositiveInt(forUserId));
    }

    @Get('sponsorship-private-tracking')
    @ApiOperation({
        summary:
            'Owner-private sponsorship money charts (income today UTC, last 30 days). Not for public profile viewers.',
    })
    @ApiQuery({ name: 'forUserId', required: false, description: 'Subject user id (defaults to current user; admin only)' })
    getSponsorshipPrivateTracking(
        @ActiveUser() user: ActiveUserData,
        @Query('forUserId') forUserId?: string,
    ) {
        return this.analyticsService.getSponsorshipPrivateTracking(user, parseOptionalPositiveInt(forUserId));
    }
}
