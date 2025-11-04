import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './providers/chat.service';
import { ChatGateway } from './providers/chat.gateway';
import { WsAccessTokenGuard } from '../auth/guards/ws-access-token.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationEntity } from './chat.entity';
import { ConversationParticipantEntity } from './conversation-participant.entity';
import { User } from '../users/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import jwtConfig from '../auth/config/jwt.config';
import { KafkaModule } from '../kafka/kafka.module';
import { UploadsModule } from '../uploads/uploads.module';
import { UploadEntity } from '../uploads/upload.entity';
import { MessagePersistenceConsumer } from './providers/message-persistence.consumer';
import { MessageReceiptEntity } from './message-receipt.entity';
import { MessageEntity } from './message.entity';

@Module({
    controllers: [ChatController],
    providers: [ChatService, ChatGateway, WsAccessTokenGuard, MessagePersistenceConsumer],
    imports: [
        TypeOrmModule.forFeature([ConversationEntity, ConversationParticipantEntity, User, MessageEntity, MessageReceiptEntity, UploadEntity]),
        TypeOrmModule.forFeature([ConversationEntity, ConversationParticipantEntity, User, MessageEntity, MessageReceiptEntity, UploadEntity]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('jwt.secret'),
                signOptions: { 
                    audience: configService.get<string>('jwt.audience'),
                    issuer: configService.get<string>('jwt.issuer'),
                    expiresIn: configService.get<string>('jwt.accessTokenTtl'),
                },
            }),
            inject: [ConfigService],
        }),
        ConfigModule.forFeature(jwtConfig),
        JwtModule.registerAsync(jwtConfig.asProvider()),
        KafkaModule,
        UploadsModule,
        
    ],
    exports: [ChatService]
})
export class ChatModule { }
