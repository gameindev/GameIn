import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsObject, IsArray } from 'class-validator';
import { NotificationType } from '../enums/notification-type.enum';
import { NotificationChannel } from '../enums/notification-channel.enum';

export class CreateNotificationDto {
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsEnum(NotificationType)
    @IsNotEmpty()
    type: NotificationType;

    @IsArray()
    @IsEnum(NotificationChannel, { each: true })
    @IsNotEmpty()
    channels: NotificationChannel[];

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    message: string;

    @IsObject()
    @IsOptional()
    data?: Record<string, any>;

    @IsObject()
    @IsOptional()
    metadata?: Record<string, any>;

    @IsString()
    @IsOptional()
    priority?: 'low' | 'normal' | 'high';

    @IsNumber()
    @IsOptional()
    delaySeconds?: number; // Delay sending by X seconds
}

