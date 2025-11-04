import { JwtService } from '@nestjs/jwt';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from "@nestjs/websockets";
import { Inject, UseGuards } from "@nestjs/common";
import { Server } from "socket.io";
import { RedisIoAdapter } from "../../redis/redisIOAdaptor.service";
import { Socket } from "socket.io";
import { WsAccessTokenGuard } from "../../auth/guards/ws-access-token.guard";
import jwtConfig from '../../auth/config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { KafkaService } from '../../kafka/kafka.service';
import { v4 as uuidv4 } from 'uuid';
import { MessageType } from '../enum/message-type.enum';
import { ChatService } from './chat.service';

@UseGuards(WsAccessTokenGuard)
@WebSocketGateway({
    cors: {
        origin: ['https://gamein.gg', 'https://www.gamein.gg'],
        credentials: true,
    },
    transports: ['websocket'],
    path: '/socket.io',
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    constructor(

        private readonly jwtService: JwtService,
        private readonly kafkaService: KafkaService,
        private readonly chatService: ChatService,
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    ) { }


    afterInit(server: any) {
        console.log('ChatGateway initialized');

        // Set up Kafka consumer for read events
        this.setupReadEventConsumer();
    }

    private async setupReadEventConsumer() {
        try {
            await this.kafkaService.subscribeToTopic('chat.message.read', async (payload) => {
                const readData = JSON.parse(payload.message.value.toString());
                console.log('Received read event from Kafka:', readData);
                await this.handleMessageReadEvent(readData);
            });
            console.log('Read event consumer set up successfully');
        } catch (error) {
            console.error('Failed to set up read event consumer:', error);
        }
    }


    async subscribeToConversation(conversationId: number) {
        await RedisIoAdapter.subscribe(`conv:${conversationId}`, (payload) => {
            try {
                const parsed = JSON.parse(payload);
                this.server.to(`conv:${conversationId}`).emit('messages', parsed);
            } catch (e) {
                console.error('Failed to parse Redis payload:', (e as Error)?.message || e);
            }
        });
    }


    async handleConnection(client: Socket, ...args: any[]) {
        try {
            const accessToken = client.handshake.auth.token;
            // console.log(client);
            if (!accessToken) {
                console.error('No authorization header provided');
                client.disconnect();
                return;
            }

            // Extract token from "Bearer <token>" format
            const token = accessToken.split(' ')[1];
            if (!token) {
                console.error('Invalid authorization header format');
                client.disconnect();
                return;
            }

            // Verify JWT token
            const user = await this.jwtService.verifyAsync(token, {
                secret: this.jwtConfiguration.secret,
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer,
            });

            console.log('Authenticated user:', user);

            // Store in client data for later use
            client.data.user_id = user.sub; // JWT sub field contains user ID
            client.data.username = user.username;
            client.data.email = user.email;
            client.data.user_type = user.user_type;
            client.data.socket_id = client.id;

            console.log('Authenticated client connected:', {
                userId: user.sub,
                username: user.username,
                email: user.email,
                userType: user.user_type,
                socketId: client.id
            });

            // Join global online users room (for inbox page)
            client.join('online_users');

            // Broadcast user online status to all clients
            this.server.emit('user_online', {
                userId: user.sub,
                username: user.username,
                email: user.email,
                userType: user.user_type,
                socketId: client.id,
                timestamp: new Date().toISOString()
            });

            // Send current online users list to the newly connected client
            const onlineUsers = this.getOnlineUsers();
            client.emit('online_users_list', onlineUsers);

        } catch (error) {
            console.error('Authentication failed:', error.message);
            client.disconnect();
        }
    }


    handleDisconnect(client: Socket) {
        console.log('Client disconnected:', client.data);

        // Leave global online users room
        client.leave('online_users');

        // Leave conversation room if any
        if (client.data.conversation_id) {
            client.leave(`conv:${client.data.conversation_id}`);
        }

        // Broadcast user offline status to all clients
        this.server.emit('user_offline', {
            userId: client.data.user_id,
            username: client.data.username,
            socketId: client.id,
            timestamp: new Date().toISOString()
        });
    }



    /**
     * Join a conversation room
     */
    async joinConversation(client: Socket, conversationId: number): Promise<void> {
        client.join(`conv:${conversationId}`);
        client.data.conversation_id = conversationId;
        console.log(client.data.email);
        try {
            await this.subscribeToConversation(conversationId);
            const messages = await this.chatService.getConversationMessages(conversationId);
            console.log(messages);
            this.server.to(`conv:${conversationId}`).emit('messages', messages);
        } catch (err) {
            console.error('❌ Redis subscription failed:', err);
        }
        console.log(`✅ ${client.data.email} joined conv:${conversationId}`);
    }


    /**
     * Leave a conversation room
     */
    leaveConversation(client: Socket, conversationId: number): void {
        client.leave(`conv:${conversationId}`);
        client.data.conversation_id = null;

        console.log(`User ${client.data.email} left conversation ${conversationId}`);

        // Notify others in the conversation
        client.to(`conv:${conversationId}`).emit('user_left_conversation', {
            userId: client.data.user_id,
            username: client.data.username,
            conversationId,
            timestamp: new Date().toISOString()
        });
    }

    /**
     * Get all online users (for inbox page)
     */
    getOnlineUsers(): any[] {
        const onlineUsersRoom = this.server.sockets.adapter.rooms.get('online_users');
        if (!onlineUsersRoom) return [];

        const onlineUsers = [];
        for (const socketId of onlineUsersRoom) {
            const socket = this.server.sockets.sockets.get(socketId);
            if (socket && socket.data.user_id) {
                onlineUsers.push({
                    userId: socket.data.user_id,
                    username: socket.data.username,
                    email: socket.data.email,
                    userType: socket.data.user_type,
                    socketId: socket.id,
                    currentConversationId: socket.data.conversation_id,
                    connectedAt: new Date()
                });
            }
        }
        return onlineUsers;
    }

    /**
     * Get online users for a specific conversation
     */
    getOnlineUsersForConversation(conversationId: number): any[] {
        const room = this.server.sockets.adapter.rooms.get(`conv:${conversationId}`);
        if (!room) return [];

        const onlineUsers = [];
        for (const socketId of room) {
            const socket = this.server.sockets.sockets.get(socketId);
            if (socket && socket.data.user_id) {
                onlineUsers.push({
                    userId: socket.data.user_id,
                    username: socket.data.username,
                    email: socket.data.email,
                    userType: socket.data.user_type,
                    socketId: socket.id,
                    connectedAt: new Date()
                });
            }
        }
        return onlineUsers;
    }

    /**
     * Broadcast online users list to all clients (for inbox page)
     */
    broadcastOnlineUsers(): void {
        const onlineUsers = this.getOnlineUsers();
        console.log(onlineUsers);
        this.server.emit('online_users_list', onlineUsers);
    }

    /**
     * Broadcast online users for a specific conversation
     */
    broadcastConversationUsers(conversationId: number): void {
        const onlineUsers = this.getOnlineUsersForConversation(conversationId);
        this.server.to(`conv:${conversationId}`).emit('conversation_users', onlineUsers);
    }

    // Socket.IO Event Handlers

    /**
     * Handle joining a conversation
     */
    @SubscribeMessage('join_conversation')
    async handleJoinConversation(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: { conversationId: number }
    ): Promise<void> {
        const conversationId = data.conversationId;
        console.log('🚀 Joining conversation:', conversationId);
        if (conversationId) {
            await this.joinConversation(client, conversationId);
            this.broadcastConversationUsers(conversationId);
        }
    }

    /**
     * Handle leaving a conversation
     */
    @SubscribeMessage('leave_conversation')
    handleLeaveConversation(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: { conversationId: number }
    ): void {
        const { conversationId } = data;
        if (conversationId) {
            this.leaveConversation(client, conversationId);
            this.broadcastConversationUsers(conversationId);
        }
    }

    /**
     * Handle getting online users list
     */
    @SubscribeMessage('get_online_users')
    handleGetOnlineUsers(@ConnectedSocket() client: Socket): void {
        this.broadcastOnlineUsers();
    }

    /**
     * Handle getting conversation users
     */
    @SubscribeMessage('get_conversation_users')
    handleGetConversationUsers(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: { conversationId: number }
    ): void {
        const { conversationId } = data;
        if (conversationId) {
            this.broadcastConversationUsers(conversationId);
        }
    }

    /**
     * Handle user activity (heartbeat)
     */
    @SubscribeMessage('user_activity')
    handleUserActivity(@ConnectedSocket() client: Socket): void {
        // Update last seen timestamp
        client.data.lastSeen = new Date();

        // Broadcast activity to all online users
        this.server.emit('user_activity_update', {
            userId: client.data.user_id,
            username: client.data.username,
            lastSeen: client.data.lastSeen,
            timestamp: new Date().toISOString()
        });
    }





    @SubscribeMessage('send_message')
    async handleSendMessage(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: { conversationId: number, content: string, attachments?: any[], json_data?: Record<string, any>, timestamp?: string, type?: MessageType, client_msg_id?: string }
    ) {

        if (!data?.conversationId || !data?.content) return;

        try {
            // Use provided client_msg_id or generate a new one
            const clientMsgId = data.client_msg_id || this.generateClientMessageId();

            const message = {
                id: clientMsgId,
                conversationId: data.conversationId,
                sender_id: client.data.user_id,
                content: data.content,
                json_data: data.json_data || null,
                attachments: data.attachments ?? [],
                username: client.data.username,
                type: data.type ?? MessageType.TEXT,
                timestamp: new Date().toISOString(),
                metadata: {
                    client_msg_id: clientMsgId,
                    client_id: client.id,
                    ip: client.handshake.address,
                },
            };

            // console.log('🚀 Sending message:', message);


            // // Emit to the conversation room
            // this.server.to(`conv:${data.conversationId}`).emit('messages', message);

            // 1. IMMEDIATE: Real-time delivery via Redis (existing)
            await this.broadcastMessage(data.conversationId, message);

            // 2. IMMEDIATE: Send to Kafka (NEW - Write-Behind)
            await this.kafkaService.sendMessage('chat.message.sent', {
                key: data.conversationId.toString(), // Ensures ordering per conversation
                value: message
            });

            // 3. ASYNC: Database persistence happens in background consumer
            return { success: true, messageId: message.id, timestamp: message.timestamp };
        } catch (error) {
            console.error('Error sending message:', error);
            return { success: false, error: error.message };
        }
    }


    private async broadcastMessage(conversationId: number, messageData: any) {
        // Your existing Redis broadcasting logic
        await RedisIoAdapter.publish(`conv:${conversationId}`, JSON.stringify({
            type: 'message',
            data: messageData
        }));
    }

    private async broadcastReadStatus(conversationId: number, readData: any) {
        // Broadcast read status to conversation participants
        await RedisIoAdapter.publish(`conv:${conversationId}`, JSON.stringify({
            type: 'message_read',
            data: readData
        }));
    }

    // Method to handle Kafka read events and broadcast via WebSocket
    async handleMessageReadEvent(readData: any) {
        console.log('Handling message read event:', readData);

        const broadcastData = {
            messageId: readData.messageId,
            conversationId: readData.conversationId,
            userId: readData.userId,
            readAt: readData.readAt,
            timestamp: readData.timestamp || new Date().toISOString()
        };

        await this.broadcastReadStatus(readData.conversationId, broadcastData);
    }


    private generateClientMessageId(): string {
        return `${Date.now()}-${uuidv4().replace(/-/g, '')}`;
    }


}