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
        const host = process.env.REDIS_HOST || 'localhost';
        const port = process.env.REDIS_PORT || '6379';
        const password = process.env.REDIS_PASSWORD || '';
        const url = password
            ? `redis://:${encodeURIComponent(password)}@${host}:${port}`
            : `redis://${host}:${port}`;

        const pubClient = createClient({ url });
        const subClient = pubClient.duplicate();

        await Promise.all([pubClient.connect(), subClient.connect()]);

        this.adapterConstructor = createAdapter(pubClient, subClient);
        RedisIoAdapter.pubClient = pubClient;
        RedisIoAdapter.subClient = subClient;
    }

    createIOServer(port: number, options?: ServerOptions): any {
        const server = super.createIOServer(port, options);
        server.adapter(this.adapterConstructor);
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
}
