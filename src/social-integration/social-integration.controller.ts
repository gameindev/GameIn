import { Controller, Get, Query, Req } from '@nestjs/common';
import { SocialIntegrationService } from './providers/social-integration.service';
import { SocialPlatform } from './enums/social-platform.enums';
import { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Controller('social-integration')
export class SocialIntegrationController {
    constructor(private readonly service: SocialIntegrationService) { }

    /**
     * @description Get the URL for the OAuth2 flow
     * @param platform The social platform to connect to
     * @returns The URL for the OAuth2 flow
     */
    @Get('connect')
    @ApiBearerAuth()
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
    @ApiBearerAuth()
    @Auth(AuthType.None)
    async handleCallback(
        @Query('platform') platform: SocialPlatform,
        @Query('code') code: string,
        @Query('state') state: string
    ) {
        await this.service.handleCallback(platform, code, state);
        return { message: 'Twitch Connected!' };
    }



    @Get('stats')
    @ApiBearerAuth()
    @Auth(AuthType.Bearer)
    async fetchStats(
        @Query('platform') platform: SocialPlatform,
        @Query('integrationId') integrationId: number,
    ) {
        const followers = await this.service.fetchStats(platform, integrationId);
        return { followers };
    }
}
