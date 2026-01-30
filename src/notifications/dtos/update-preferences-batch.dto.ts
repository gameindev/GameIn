import { IsArray, ValidateNested, IsEnum, IsBoolean, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { NotificationType } from '../enums/notification-type.enum';
import { NotificationChannel } from '../enums/notification-channel.enum';

class PreferenceItemDto {
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

export class UpdatePreferencesBatchDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PreferenceItemDto)
    preferences: PreferenceItemDto[];
}

