import { Injectable, Logger } from '@nestjs/common';
import { RedisIoAdapter } from './redisIOAdaptor.service';
import { createClient } from 'redis';

@Injectable()
export class RedisCacheService {
    private readonly logger = new Logger(RedisCacheService.name);
    
    private get client(): ReturnType<typeof createClient> | null {
        // Reuse the existing Redis connection from RedisIoAdapter
        return RedisIoAdapter.getCacheClient();
    }

    // Generic cache methods
    async get<T>(key: string): Promise<T | null> {
        try {
            const client = this.client;
            if (!client || !client.isOpen) {
                this.logger.warn(`Redis client not available for key ${key}`);
                return null;
            }
            const value = await client.get(key);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            this.logger.error(`Error getting key ${key}`, error);
            return null; // Fail gracefully - return null to fallback to DB
        }
    }

    async set(key: string, value: any, ttl?: number): Promise<void> {
        try {
            const client = this.client;
            if (!client || !client.isOpen) {
                this.logger.warn(`Redis client not available for key ${key}`);
                return;
            }
            const serialized = JSON.stringify(value);
            if (ttl) {
                await client.setEx(key, ttl, serialized);
            } else {
                await client.set(key, serialized);
            }
        } catch (error) {
            this.logger.error(`Error setting key ${key}`, error);
            // Don't throw - cache failures shouldn't break the app
        }
    }

    async delete(key: string): Promise<void> {
        try {
            const client = this.client;
            if (!client || !client.isOpen) {
                this.logger.warn(`Redis client not available for key ${key}`);
                return;
            }
            await client.del(key);
        } catch (error) {
            this.logger.error(`Error deleting key ${key}`, error);
        }
    }

    async deletePattern(pattern: string): Promise<void> {
        try {
            const client = this.client;
            if (!client || !client.isOpen) {
                this.logger.warn(`Redis client not available for pattern ${pattern}`);
                return;
            }
            const keys = await client.keys(pattern);
            if (keys.length > 0) {
                await client.del(keys);
            }
        } catch (error) {
            this.logger.error(`Error deleting pattern ${pattern}`, error);
        }
    }

    async exists(key: string): Promise<boolean> {
        try {
            const client = this.client;
            if (!client || !client.isOpen) {
                this.logger.warn(`Redis client not available for key ${key}`);
                return false;
            }
            const result = await client.exists(key);
            return result === 1;
        } catch (error) {
            this.logger.error(`Error checking key ${key}`, error);
            return false;
        }
    }
}

