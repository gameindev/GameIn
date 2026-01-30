import { Injectable } from '@nestjs/common';
import { NotificationChannelInterface } from '../interfaces/notification-channel.interface';
import { NotificationChannel } from '../enums/notification-channel.enum';
import { InAppChannelProvider } from './channels/in-app-channel.provider';
import { EmailChannelProvider } from './channels/email-channel.provider';
import { SmsChannelProvider } from './channels/sms-channel.provider';
import { PushChannelProvider } from './channels/push-channel.provider';

@Injectable()
export class NotificationChannelFactory {
    constructor(
        private readonly inAppProvider: InAppChannelProvider,
        private readonly emailProvider: EmailChannelProvider,
        private readonly smsProvider: SmsChannelProvider,
        private readonly pushProvider: PushChannelProvider,
    ) {}

    getProvider(channel: NotificationChannel): NotificationChannelInterface {
        switch (channel) {
            case NotificationChannel.IN_APP:
                return this.inAppProvider;
            case NotificationChannel.EMAIL:
                return this.emailProvider;
            case NotificationChannel.SMS:
                return this.smsProvider;
            case NotificationChannel.PUSH:
                return this.pushProvider;
            default:
                throw new Error(`Unknown notification channel: ${channel}`);
        }
    }

    getAllProviders(): NotificationChannelInterface[] {
        return [
            this.inAppProvider,
            this.emailProvider,
            this.smsProvider,
            this.pushProvider,
        ];
    }
}

