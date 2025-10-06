import { Controller, Get, ParseEnumPipe, Query, Req } from '@nestjs/common';
import { SocialIntegrationService } from './providers/social-integration.service';
import { SocialPlatform } from './enums/social-platform.enums';
import { Request } from 'express';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Auth } from '@/auth/decorators/auth.decorator';
import { AuthType } from '@/auth/enums/auth-type.enum';
import { ActiveUser } from '@/auth/decorators/active-user.decorator';
import { ActiveUserData } from '@/auth/interfaces/active-user-data.interface';

@ApiTags('Social Integration')
@Controller('social-integration')
@ApiBearerAuth()
export class SocialIntegrationController {
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
        const platforms = Object.values(SocialPlatform);
        return this.service.checkAll(userId, platforms);
    }

    /**
     * @description Get the URL for the OAuth2 flow
     * @param platform The social platform to connect to
     * @returns The URL for the OAuth2 flow
     */
    @Get('connect')
    @Auth(AuthType.Bearer)
    async getAuthUrl(
        @Query('platform') platform: SocialPlatform,
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
    async handleCallback(
        @Query('platform') platform: SocialPlatform,
        @Query('code') code: string,
        @Query('state') state: string
    ) {
        await this.service.handleCallback(platform, code, state);
        return { success: true, message: 'Platform Connected!' };
    }



    @Get('stats')
    @Auth(AuthType.Bearer)
    async fetchStats(
        @Query('platform') platform: SocialPlatform,
        @Query('integrationId') integrationId: number,
    ) {
        const followers = await this.service.fetchStats(platform, integrationId);
        return { followers };
    }
}
