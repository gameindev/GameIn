import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { NotificationsController } from './notifications.controller';
import { NotificationService } from './providers/notification.service';
import { NotificationConsumerService } from './providers/notification-consumer.service';
import { NotificationEventsService } from './providers/notification-events.service';
import { NotificationChannelFactory } from './providers/notification-channel.factory';
import { NotificationEntity } from './entities/notification.entity';
import { NotificationPreferenceEntity } from './entities/notification-preference.entity';
import { InAppChannelProvider } from './providers/channels/in-app-channel.provider';
import { EmailChannelProvider } from './providers/channels/email-channel.provider';
import { SmsChannelProvider } from './providers/channels/sms-channel.provider';
import { PushChannelProvider } from './providers/channels/push-channel.provider';
import { KafkaModule } from '../kafka/kafka.module';
import { EmailsModule } from '../emails/emails.module';
import { NotificationGateway } from './providers/notification.gateway';
import jwtConfig from '../auth/config/jwt.config';

@Module({
    imports: [
        TypeOrmModule.forFeature([NotificationEntity, NotificationPreferenceEntity]),
        ConfigModule.forFeature(jwtConfig),
        JwtModule.registerAsync(jwtConfig.asProvider()),
        KafkaModule,
        EmailsModule,
    ],
    controllers: [NotificationsController],
    providers: [
        NotificationService,
        NotificationConsumerService,
        NotificationEventsService,
        NotificationChannelFactory,
        NotificationGateway, // WebSocket gateway for notifications
        InAppChannelProvider,
        EmailChannelProvider,
        SmsChannelProvider,
        PushChannelProvider,
    ],
    exports: [
        NotificationService,
        NotificationEventsService, // Export for other services to use
    ],
})
export class NotificationsModule {}

