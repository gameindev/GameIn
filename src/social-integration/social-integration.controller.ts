import { Controller, Delete, Get, Logger, ParseEnumPipe, ParseIntPipe, Post, Query, Res } from '@nestjs/common';
import { SocialIntegrationService } from './providers/social-integration.service';
import { SocialPlatform, SOCIAL_INTEGRATION_OAUTH_PLATFORMS } from './enums/social-platform.enums';
import { Request } from 'express';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ActiveUserData } from '../auth/interfaces/active-user-data.interface';
import { ActiveUser } from '../auth/decorators/active-user.decorator';
import { AuthType } from '../auth/enums/auth-type.enum';
import { Auth } from '../auth/decorators/auth.decorator';
import { Response } from 'express';
import { socialErrorLog } from './utils/social-oauth-debug.util';

@ApiTags('Social Integration')
@Controller('social-integration')
@ApiBearerAuth()
export class SocialIntegrationController {
    private readonly logger = new Logger(SocialIntegrationController.name);

    constructor(private readonly service: SocialIntegrationService) { }


    /**
   * Returns Add / Connect / Connected for a single platform
   */
    @Get('status')
    // @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Check connection status for a platform' })
    @ApiQuery({ name: 'platform', enum: SocialPlatform })
    async getStatus(
        @Query('platform') platform: SocialPlatform,
        @ActiveUser() user: ActiveUserData
    ) {
        return this.service.checkConnection(user.sub, platform);
    }


    /**
   * Returns status for all supported platforms
   */
    @Get('status/all')
    // @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Check connection status for all platforms' })
    async getAllStatuses(
        @ActiveUser() user: ActiveUserData
    ) {
        const userId = user.sub; // e.g., req.user.id
        return this.service.checkAll(userId, [...SOCIAL_INTEGRATION_OAUTH_PLATFORMS]);
    }

    /**
     * @description Get the URL for the OAuth2 flow
     * @param platform The social platform to connect to
     * @returns The URL for the OAuth2 flow
     */
    @Get('connect')
    @Auth(AuthType.Bearer)
    @ApiQuery({ name: 'platform', enum: SocialPlatform })
    async getAuthUrl(
        @Query('platform', new ParseEnumPipe(SocialPlatform)) platform: SocialPlatform,
        @ActiveUser() user: ActiveUserData
    ) {
        const url = await this.service.getAuthUrl(platform, user);
        return { url };
    }


    /**
     * @description Handle the callback from the OAuth2 flow
     * @param platform The social platform to connect to
     * @param code The code returned from the OAuth2 flow
     * @param state The state returned from the OAuth2 flow
     * @returns The URL to redirect to
     */
    @Get('callback')
    @Auth(AuthType.None)
    @ApiQuery({ name: 'platform', enum: SocialPlatform })
    async handleCallback(
        @Query('platform', new ParseEnumPipe(SocialPlatform)) platform: SocialPlatform,
        @Query('code') code: string,
        @Query('state') state: string,
        @Res() res: Response
    ) {
        try {
            await this.service.handleOAuthCallback(platform, code, state);
        
            // Redirect to frontend success page
            const redirectUrl = `${process.env.FRONTEND_HOST}/#/social-integration/callback?status=success`;
            return res.redirect(redirectUrl);
          } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            socialErrorLog(this.logger, String(platform), 'callback redirect', err);
            const redirectUrl = `${process.env.FRONTEND_HOST}/#/social-integration/callback?status=error&message=${encodeURIComponent(message)}`;
            return res.redirect(redirectUrl);
          }
    }



    @Get('stats')
    @Auth(AuthType.Bearer)
    async fetchStats(
        @Query('platform') platform: SocialPlatform,
        @Query('integrationId', ParseIntPipe) integrationId: number,
        @ActiveUser() user: ActiveUserData,
    ) {
        const raw = await this.service.fetchStats(platform, integrationId, user.sub);
        return this.service.normalizeStats(platform, raw);
    }

    @Get('stats/public')
    @Auth(AuthType.None)
    async fetchPublicStats(
        @Query('userId', ParseIntPipe) userId: number,
    ) {
        return this.service.getPublicStatsByUser(userId);
    }

    @Post('sync')
    @Auth(AuthType.Bearer)
    async syncPlatform(
        @Query('platform', new ParseEnumPipe(SocialPlatform)) platform: SocialPlatform,
        @ActiveUser() user: ActiveUserData,
    ) {
        return this.service.syncPlatform(user.sub, platform);
    }

    @Delete()
    @Auth(AuthType.Bearer)
    async disconnect(
        @Query('platform', new ParseEnumPipe(SocialPlatform)) platform: SocialPlatform,
        @ActiveUser() user: ActiveUserData,
    ) {
        return this.service.disconnect(user.sub, platform);
    }
}
