import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Query,
    UseGuards,
    Request,
    ParseIntPipe,
} from '@nestjs/common';
import { NotificationService } from './providers/notification.service';
import { CreateNotificationDto } from './dtos/create-notification.dto';
import { UpdatePreferenceDto } from './dtos/update-preference.dto';
import { UpdatePreferencesBatchDto } from './dtos/update-preferences-batch.dto';
import { AccessTokenGuard } from '../auth/guards/access-token/access-token.guard';

@Controller('notifications')
@UseGuards(AccessTokenGuard)
export class NotificationsController {
    constructor(private readonly notificationService: NotificationService) {}

    /**
     * Get user's notifications
     * GET /notifications?limit=50&offset=0&unreadOnly=false
     */
    @Get()
    async getNotifications(
        @Request() req: any,
        @Query('limit') limit?: string,
        @Query('offset') offset?: string,
        @Query('unreadOnly') unreadOnly?: string,
    ) {
        const userId = req.user.sub;
        const result = await this.notificationService.getUserNotifications(
            userId,
            limit ? parseInt(limit, 10) : 50,
            offset ? parseInt(offset, 10) : 0,
            unreadOnly === 'true',
        );

        return {
            success: true,
            data: result.notifications,
            total: result.total,
        };
    }

    /**
     * Get user's notification preferences
     * GET /notifications/preferences
     * Auto-initializes preferences if user has none (for existing users)
     */
    @Get('preferences')
    async getPreferences(@Request() req: any) {
        const userId = req.user.sub;
        let preferences = await this.notificationService.getUserPreferences(userId);

        // If user has no preferences (existing user before preference system), initialize defaults
        if (!preferences || preferences.length === 0) {
            await this.notificationService.initializeDefaultPreferences(userId);
            preferences = await this.notificationService.getUserPreferences(userId);
        }

        return {
            success: true,
            data: preferences,
        };
    }

    /**
     * Update notification preference
     * PUT /notifications/preferences
     */
    @Put('preferences')
    async updatePreference(@Request() req: any, @Body() dto: UpdatePreferenceDto) {
        const userId = req.user.sub;
        const preference = await this.notificationService.updatePreference(
            userId,
            dto.type,
            dto.channel,
            dto.enabled,
        );

        return {
            success: true,
            data: preference,
        };
    }

    /**
     * Update multiple notification preferences in batch
     * PUT /notifications/preferences/batch
     */
    @Put('preferences/batch')
    async updatePreferencesBatch(@Request() req: any, @Body() dto: UpdatePreferencesBatchDto) {
        const userId = req.user.sub;
        const results = await this.notificationService.updatePreferencesBatch(
            userId,
            dto.preferences,
        );

        return {
            success: true,
            data: results,
            count: results.length,
        };
    }

    /**
     * Mark notification as read
     * PUT /notifications/:id/read
     */
    @Put(':id/read')
    async markAsRead(@Request() req: any, @Param('id', ParseIntPipe) id: number) {
        const userId = req.user.sub;
        const notification = await this.notificationService.markAsRead(id, userId);

        return {
            success: true,
            data: notification,
        };
    }

    /**
     * Mark all notifications as read
     * PUT /notifications/read-all
     */
    @Put('read-all')
    async markAllAsRead(@Request() req: any) {
        const userId = req.user.sub;
        const result = await this.notificationService.markAllAsRead(userId);

        return {
            success: true,
            data: result,
        };
    }

    /**
     * Delete notification
     * DELETE /notifications/:id
     */
    @Delete(':id')
    async deleteNotification(@Request() req: any, @Param('id', ParseIntPipe) id: number) {
        const userId = req.user.sub;
        await this.notificationService.deleteNotification(id, userId);

        return {
            success: true,
            message: 'Notification deleted',
        };
    }

    /**
     * Send notification directly (for testing/admin)
     * POST /notifications/send
     */
    @Post('send')
    async sendNotification(@Body() dto: CreateNotificationDto) {
        const result = await this.notificationService.sendNotification(dto);

        return {
            success: result.success,
            data: result.notifications,
        };
    }
}

