import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import axiosRetry from 'axios-retry';
import * as Cheerio from 'cheerio';
import { PatchPreferredGamesDto } from '../../preferred-games/dto/patch-preferred-games.dto';

// Setup axios globally with retry
axiosRetry(axios, {
    retries: 3,
    retryDelay: (retryCount) => retryCount * 2000,  // Exponential backoff
    retryCondition: (error) => {
        return axiosRetry.isNetworkOrIdempotentRequestError(error)
            || error.code === 'ECONNRESET'
            || error.code === 'ETIMEDOUT';
    }
});

@Injectable()
export class MetadataService {
    private readonly logger = new Logger(MetadataService.name);

    private userAgents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.1 Safari/605.1.15'
    ];

    async extractMetadata(url: string): Promise<any> {
        try {
            const response = await axios.get(url, {
                timeout: 10000, // 10 second timeout
                headers: {
                    'User-Agent': this.getRandomUserAgent()
                }
            });

            const html = response.data;
            const $ = Cheerio.load(html);

            const title = $('head > title').text() || null;

            let favicon = $('link[rel="icon"]').attr('href')
                || $('link[rel="shortcut icon"]').attr('href')
                || $('link[rel="apple-touch-icon"]').attr('href')
                || null;

            if (favicon && !favicon.startsWith('http')) {
                favicon = new URL(favicon, url).href;
            }

            const description = $('meta[name="description"]').attr('content')
                || $('meta[property="og:description"]').attr('content')
                || null;

            return {
                url,
                title,
                description,
                favicon,
            };

        } catch (error) {
            if (axios.isAxiosError(error)) {
                this.logger.warn(`[MetadataService] Failed for URL: ${url}`);
                this.logger.warn(`[AxiosError] Code: ${error.code}, Message: ${error.message}`);
            } else {
                this.logger.error(`[MetadataService] Unknown Error for URL: ${url}`, error);
            }

            // Graceful fallback: return partial metadata
            return {
                url,
                title: null,
                description: null,
                favicon: null,
            };
        }
    }

    private getRandomUserAgent(): string {
        const randomIndex = Math.floor(Math.random() * this.userAgents.length);
        return this.userAgents[randomIndex];
    }

    async enrichPreferredGames(preferredGames: PatchPreferredGamesDto[]): Promise<PatchPreferredGamesDto[]> {
        const enriched = await Promise.all(
            preferredGames.map(async (game) => {
                const metadata = await this.extractMetadata(game.game_url);
                return {
                    ...game,
                    meta_data: metadata,
                };
            })
        );
        return enriched;
    }
}
