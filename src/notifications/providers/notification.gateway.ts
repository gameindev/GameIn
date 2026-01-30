import { JwtService } from '@nestjs/jwt';
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Inject, UseGuards } from '@nestjs/common';
import { Server } from 'socket.io';
import { RedisIoAdapter } from '../../redis/redisIOAdaptor.service';
import { Socket } from 'socket.io';
import { WsAccessTokenGuard } from '../../auth/guards/ws-access-token.guard';
import jwtConfig from '../../auth/config/jwt.config';
import { ConfigType } from '@nestjs/config';

/**
 * Notification Gateway
 * Handles real-time notification delivery via WebSocket
 * 
 * Note: Uses the same Socket.IO server instance as ChatGateway
 * but handles only notification-related events
 */
@UseGuards(WsAccessTokenGuard)
@WebSocketGateway({
    cors: {
        origin: [
            'https://gamein.gg',
            'https://www.gamein.gg',
            'https://frontend-app-vn9qp.ondigitalocean.app',
        ],
        credentials: true,
    },
    transports: ['websocket'],
    path: '/socket.io', // Same path as ChatGateway - shares the same server
})
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    constructor(
        private readonly jwtService: JwtService,
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    ) {}

    async handleConnection(client: Socket, ...args: any[]) {
        try {
            const accessToken = client.handshake.auth.token;
            if (!accessToken) {
                console.error('No authorization token provided for notification gateway');
                return; // Don't disconnect - let ChatGateway handle auth
            }

            // Extract token from "Bearer <token>" format
            const token = accessToken.split(' ')[1];
            if (!token) {
                console.error('Invalid authorization header format');
                return;
            }

            // Verify JWT token
            const user = await this.jwtService.verifyAsync(token, {
                secret: this.jwtConfiguration.secret,
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer,
            });

            // Store user ID for notification subscription
            const userId = user.sub;

            // Subscribe to user's notification channel
            await this.subscribeToUserNotifications(userId, client);

            console.log(`✅ Notification gateway: Subscribed user ${userId} to notifications`);
        } catch (error) {
            console.error('Notification gateway: Authentication failed:', error.message);
            // Don't disconnect - connection might be valid for ChatGateway
        }
    }

    handleDisconnect(client: Socket) {
        // Cleanup is handled automatically by Redis subscription
        console.log('Notification gateway: Client disconnected');
    }

    /**
     * Subscribe to user's notification channel via Redis
     */
    private async subscribeToUserNotifications(userId: number, client: Socket) {
        try {
            await RedisIoAdapter.subscribe(`notifications:user:${userId}`, (payload) => {
                try {
                    const parsed = JSON.parse(payload);
                    // Emit notification to the specific client
                    client.emit('notification', parsed);
                } catch (e) {
                    console.error('Failed to parse notification payload:', (e as Error)?.message || e);
                }
            });
        } catch (err) {
            console.error(`❌ Failed to subscribe to notifications for user ${userId}:`, err);
        }
    }
}

