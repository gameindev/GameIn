import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import twitchConfig from '../config/twitch.config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TwitchService {

    constructor(
        private readonly httpService: HttpService,

        @Inject(twitchConfig.KEY)
        private readonly twitchConfiguration: ConfigType<typeof twitchConfig>,
    ) { }
    
    private readonly baseUrl = 'https://api.twitch.tv/helix';


    /**
     * Gets the authenticated user's profile from the Twitch API.
     */
    async getUserProfile(accessToken: string): Promise<any> {
        const url = `${this.baseUrl}/users`;
        try {
            const response = await firstValueFrom(
                this.httpService.get(url, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Client-Id': this.twitchConfiguration.twitchClientId,
                    },
                }),
            );
            // The API returns an array of users, we want the first one.
            return response.data.data[0];
        } catch (error) {
            console.error('Error fetching Twitch user profile:', error.response?.data);
            throw new Error('Could not fetch user profile from Twitch.');
        }
    }



    /**
     * Fetches the user's follower count.
     */
    async getProfileStats(userId: string, accessToken: string) {
        // 1. Get user profile to have the latest data
        const userProfile = await this.getUserProfile(accessToken);

        // 2. Fetch follower count
        const followersUrl = `${this.baseUrl}/channels/followers?broadcaster_id=${userId}`;
        let followersCount = 0;

        try {
            const followersResponse = await firstValueFrom(
                this.httpService.get(followersUrl, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Client-Id': this.twitchConfiguration.twitchClientId,
                    },
                }),
            );
            followersCount = followersResponse.data.total;
        } catch (error) {
            console.error('Error fetching Twitch followers:', error.response?.data);
        }

        return {
            displayName: userProfile.display_name,
            profileImageUrl: userProfile.profile_image_url,
            followersCount,
        };
    }
}
