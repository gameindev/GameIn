import { IsEnum, IsBoolean, IsNotEmpty } from 'class-validator';
import { NotificationType } from '../enums/notification-type.enum';
import { NotificationChannel } from '../enums/notification-channel.enum';

export class UpdatePreferenceDto {
    @IsEnum(NotificationType)
    @IsNotEmpty()
    type: NotificationType;

    @IsEnum(NotificationChannel)
    @IsNotEmpty()
    channel: NotificationChannel;

    @IsBoolean()
    @IsNotEmpty()
    enabled: boolean;
}

