import { Body, Controller, Inject, Post, UseGuards, Get, Param, ParseIntPipe, Query, Patch } from '@nestjs/common';
import { ChatService } from './providers/chat.service';
import { ActiveUser } from '../auth/decorators/active-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { CreateConversationDto } from './dtos/create-conversation.dto';
import { AddAdminDto } from './dtos/add-admin.dto';
import { RemoveAdminDto } from './dtos/remove-admin.dto';
import { UpdateParticipantAdminDto } from './dtos/update-participant-admin.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@Controller('chat')
@ApiBearerAuth()
export class ChatController {
    constructor(
        @Inject(ChatService)
        private readonly chatService: ChatService,
    ) { } 


    @ApiOperation({
        summary: 'Create a new conversation'
    })
    @ApiResponse({
        status: 201,
        description: 'Conversation created successfully'
    })
    @Post('create-conversation')
    async createConversation(
        @Body() createConversationDto: CreateConversationDto
    ) {
        // console.log(createConversationDto); //TODO Console
        return this.chatService.createConversation(createConversationDto);
    }




    @ApiOperation({
        summary: 'Get conversations'
    })
    @ApiResponse({
        status: 200,
        description: 'Conversations fetched successfully'
    })
    @Get('conversations')
    async getConversations(
        @ActiveUser('sub') userId: number
    ) {
        return this.chatService.getConversations(userId);
    }


    @ApiOperation({
        summary: 'Add admin to conversation'
    })
    @ApiResponse({
        status: 200,
        description: 'User promoted to admin successfully'
    })
    @ApiResponse({
        status: 403,
        description: 'Forbidden - User does not have admin privileges'
    })
    @Post('add-admin')
    async addAdmin(
        @Body() addAdminDto: AddAdminDto,
        @ActiveUser('sub') userId: number
    ) {
        return this.chatService.addAdmin(addAdminDto, userId);
    }





    @ApiOperation({
        summary: 'Remove admin from conversation'
    })
    @ApiResponse({
        status: 200,
        description: 'User demoted from admin successfully'
    })
    @ApiResponse({
        status: 403,
        description: 'Forbidden - User does not have admin privileges'
    })
    @Post('remove-admin')
    async removeAdmin(
        @Body() removeAdminDto: RemoveAdminDto,
        @ActiveUser('sub') userId: number
    ) {
        return this.chatService.removeAdmin(removeAdminDto, userId);
    }






    @ApiOperation({
        summary: 'Update participant admin status'
    })
    @ApiResponse({
        status: 200,
        description: 'Admin status updated successfully'
    })
    @ApiResponse({
        status: 403,
        description: 'Forbidden - User does not have admin privileges'
    })
    @Post('update-admin-status')
    async updateParticipantAdminStatus(
        @Body() updateDto: UpdateParticipantAdminDto,
        @ActiveUser('sub') userId: number
    ) {
        return this.chatService.updateParticipantAdminStatus(updateDto, userId);
    }






    @ApiOperation({
        summary: 'Get conversation admins'
    })
    @ApiResponse({
        status: 200,
        description: 'List of conversation admins'
    })
    @ApiParam({
        name: 'conversationId',
        description: 'Conversation ID',
        type: 'number'
    })
    @Get('admins/:conversationId')
    async getConversationAdmins(
        @Param('conversationId', ParseIntPipe) conversationId: number
    ) {
        return this.chatService.getConversationAdmins(conversationId);
    }






    // ==================== MESSAGE ENDPOINTS ====================

    @ApiOperation({
        summary: 'Get conversation messages'
    })
    @ApiResponse({
        status: 200,
        description: 'Messages fetched successfully'
    })
    @Get('messages/:conversationId')
    async getConversationMessages(
        @Param('conversationId', ParseIntPipe) conversationId: number,
        @Query('limit') limit?: number,
        @Query('offset') offset?: number,
        @ActiveUser('sub') userId?: number
    ) {
        return this.chatService.getConversationMessages(
            conversationId,
            limit || 50,
            offset || 0
        );
    }

    @ApiOperation({
        summary: 'Mark message as read'
    })
    @ApiResponse({
        status: 200,
        description: 'Message marked as read successfully'
    })
    @Post('messages/:messageId/read')
    async markMessageAsRead(
        @Param('messageId') messageId: string,
        @ActiveUser('sub') userId: number
    ) {
        return this.chatService.markMessageAsRead(messageId, userId);
    }

    @ApiOperation({
        summary: 'Mark all conversation messages as read'
    })
    @ApiResponse({
        status: 200,
        description: 'Conversation marked as read successfully'
    })
    @Post('conversations/:conversationId/read')
    async markConversationAsRead(
        @Param('conversationId', ParseIntPipe) conversationId: number,
        @ActiveUser('sub') userId: number
    ) {
        return this.chatService.markConversationAsRead(conversationId, userId);
    }

    @ApiOperation({
        summary: 'Get message delivery status'
    })
    @ApiResponse({
        status: 200,
        description: 'Message delivery status retrieved successfully'
    })
    @Get('messages/:messageId/delivery-status')
    async getMessageDeliveryStatus(
        @Param('messageId') messageId: string,
        @ActiveUser('sub') userId: number
    ) {
        return this.chatService.getMessageDeliveryStatus(messageId);
    }

    @ApiOperation({
        summary: 'Delete a message'
    })
    @ApiResponse({
        status: 200,
        description: 'Message deleted successfully'
    })
    @Post('messages/:messageId/delete')
    async deleteMessage(
        @Param('messageId') messageId: string,
        @ActiveUser('sub') userId: number
    ) {
        return this.chatService.deleteMessage(messageId, userId);
    }


    @ApiOperation({
        summary: 'Acknowledge a message'
    })
    @ApiResponse({
        status: 200,
        description: 'Message acknowledged successfully'
    })
    @Patch('messages/:messageId')
    async acknowledgeMessage(
        @Param('messageId') messageId: string,
        @ActiveUser('sub') userId: number
    ) {
        return this.chatService.acknowledgeMessage(messageId, userId);
    }



    @ApiOperation({
        summary: 'Get conversation statistics'
    })
    @ApiResponse({
        status: 200,
        description: 'Conversation statistics retrieved successfully'
    })
    @Get('conversations/:conversationId/stats')
    async getConversationStats(
        @Param('conversationId', ParseIntPipe) conversationId: number,
        @ActiveUser('sub') userId: number
    ) {
        return this.chatService.getConversationStats(conversationId, userId);
    }

    

    @ApiOperation({
        summary: 'Get unread message count for conversation'
    })
    @ApiResponse({
        status: 200,
        description: 'Unread count retrieved successfully'
    })
    @Get('conversations/:conversationId/unread-count')
    async getUnreadMessageCount(
        @Param('conversationId', ParseIntPipe) conversationId: number,
        @ActiveUser('sub') userId: number
    ) {
        const count = await this.chatService.getUnreadMessageCount(conversationId, userId);
        return { conversationId, unreadCount: count };
    }

    
}
