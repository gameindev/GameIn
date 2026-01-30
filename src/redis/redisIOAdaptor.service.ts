/* eslint-disable */
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

export class RedisIoAdapter extends IoAdapter {
    private adapterConstructor: ReturnType<typeof createAdapter>;
    private static pubClient: ReturnType<typeof createClient> | null = null;
    private static subClient: ReturnType<typeof createClient> | null = null;

    async connectToRedis(): Promise<void> {
        // 👇 pull connection details from environment
        const host = process.env.REDIS_HOST;
        const port = process.env.REDIS_PORT || '6379';
        const password = process.env.REDIS_PASSWORD || '';
        const url = password
            ? `redis://:${encodeURIComponent(password)}@${host}:${port}`
            : `redis://${host}:${port}`;

        console.log('🔗 Connecting to Redis at', url);

        const pubClient = createClient({ url, socket: { reconnectStrategy: 5000 } });
        const subClient = pubClient.duplicate();

        pubClient.on('error', (err) => console.error('Redis Pub error', err));
        subClient.on('error', (err) => console.error('Redis Sub error', err));

        await Promise.all([pubClient.connect(), subClient.connect()]);

        this.adapterConstructor = createAdapter(pubClient, subClient);
        RedisIoAdapter.pubClient = pubClient;
        RedisIoAdapter.subClient = subClient;

        console.log('✅ Redis adapter connected');
    }

    createIOServer(port: number, options?: ServerOptions): any {
        const server = super.createIOServer(port, options);
        server.adapter(this.adapterConstructor);
        console.log('✅ Socket.IO server with Redis adapter initialized');
        return server;
    }

    static async publish(channel: string, message: string): Promise<void> {
        if (!RedisIoAdapter.pubClient || !RedisIoAdapter.pubClient.isOpen) {
            throw new Error('Redis publisher client is not connected');
        }
        await RedisIoAdapter.pubClient.publish(channel, message);
    }

    static async subscribe(
        channel: string,
        handler: (message: string) => void,
    ): Promise<void> {
        if (!RedisIoAdapter.subClient || !RedisIoAdapter.subClient.isOpen) {
            throw new Error('Redis subscriber client is not connected');
        }
        await RedisIoAdapter.subClient.subscribe(channel, (msg) => handler(msg));
    }

    /**
     * Get the Redis client for cache operations
     * Reuses the existing pubClient connection
     */
    static getCacheClient(): ReturnType<typeof createClient> | null {
        return RedisIoAdapter.pubClient;
    }
}
