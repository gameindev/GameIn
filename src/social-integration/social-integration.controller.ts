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
}
