/* eslint-disable */

import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-oauth2';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { TwitchService } from '../providers/twitch.service';
import twitchConfig from '../config/twitch.config';

@Injectable()
export class TwitchStrategy extends PassportStrategy(Strategy, 'twitch') {
    constructor(

        @Inject(twitchConfig.KEY)
        private readonly twitchConfiguration: ConfigType<typeof twitchConfig>,
        private readonly twitchService: TwitchService,
    ) {
        const clientID = twitchConfiguration.twitchClientId;
        const clientSecret = twitchConfiguration.twitchClientSecret;
        const callbackURL = twitchConfiguration.twitchCallbackUrl;

        console.log(clientID, clientSecret, callbackURL);

        if (!clientID || !clientSecret || !callbackURL) {
            throw new Error('Missing required Twitch OAuth environment variables.');
        }

        super({
            authorizationURL: 'https://id.twitch.tv/oauth2/authorize',
            tokenURL: 'https://id.twitch.tv/oauth2/token',
            clientID,
            clientSecret,
            callbackURL,
            scope: ['user:read:email', 'user:read:follows'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any, // This profile is empty for Twitch's OAuth2 strategy
        done: VerifyCallback,
    ): Promise<any> {
        const userProfile = await this.twitchService.getUserProfile(accessToken);

        const user = {
            ...userProfile,
            accessToken,
            refreshToken,
        };

        done(null, user);
    }
}
