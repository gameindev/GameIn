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
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { NewsfeedService } from './providers/newsfeed.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { CreateSystemPostDto } from './dtos/create-system-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { CreateShareDto } from './dtos/create-share.dto';
import { AccessTokenGuard } from '../auth/guards/access-token/access-token.guard';

@Controller('newsfeed')
@UseGuards(AccessTokenGuard)
export class NewsfeedController {
    constructor(private readonly newsfeedService: NewsfeedService) {}

    /**
     * Get user's feed
     * GET /newsfeed/feed?limit=20&offset=0
     */
    @Get('feed')
    async getFeed(
        @Request() req: any,
        @Query('limit') limit?: string,
        @Query('offset') offset?: string,
    ) {
        const userId = req.user.sub;
        const result = await this.newsfeedService.getUserFeed(
            userId,
            limit ? parseInt(limit, 10) : 20,
            offset ? parseInt(offset, 10) : 0,
        );

        return {
            success: true,
            data: result.posts,
            total: result.total,
            hasMore: result.hasMore,
        };
    }

    /**
     * Get posts by a specific user
     * GET /newsfeed/posts/user/:userId?limit=20&offset=0
     */
    @Get('posts/user/:userId')
    async getUserPosts(
        @Request() req: any,
        @Param('userId', ParseIntPipe) targetUserId: number,
        @Query('limit') limit?: string,
        @Query('offset') offset?: string,
    ) {
        const currentUserId = req.user.sub;
        const result = await this.newsfeedService.getUserPosts(
            targetUserId,
            currentUserId,
            limit ? parseInt(limit, 10) : 20,
            offset ? parseInt(offset, 10) : 0,
        );

        return {
            success: true,
            data: result.posts,
            total: result.total,
            hasMore: result.hasMore,
        };
    }

    /**
     * Get a single post by ID
     * GET /newsfeed/posts/:id
     */
    @Get('posts/:id')
    async getPost(@Request() req: any, @Param('id', ParseIntPipe) postId: number) {
        const userId = req.user.sub;
        const post = await this.newsfeedService.getPostById(postId, userId);

        return {
            success: true,
            data: post,
        };
    }

    /**
     * Create a new post
     * POST /newsfeed/posts
     */
    @Post('posts')
    @HttpCode(HttpStatus.CREATED)
    async createPost(@Request() req: any, @Body() dto: CreatePostDto) {
        const userId = req.user.sub;
        const post = await this.newsfeedService.createPost(userId, dto);

        return {
            success: true,
            data: post,
        };
    }

    /**
     * Create a system-generated post (admin only)
     * POST /newsfeed/posts/system
     */
    @Post('posts/system')
    @HttpCode(HttpStatus.CREATED)
    async createSystemPost(@Request() req: any, @Body() dto: CreateSystemPostDto) {
        // TODO: Add admin guard check here
        // For now, any authenticated user can create system posts
        // In production, add: @UseGuards(AdminGuard)
        const post = await this.newsfeedService.createSystemPost(dto);

        return {
            success: true,
            data: post,
        };
    }

    /**
     * Update a post
     * PUT /newsfeed/posts/:id
     */
    @Put('posts/:id')
    async updatePost(
        @Request() req: any,
        @Param('id', ParseIntPipe) postId: number,
        @Body() dto: UpdatePostDto,
    ) {
        const userId = req.user.sub;
        const post = await this.newsfeedService.updatePost(postId, userId, dto);

        return {
            success: true,
            data: post,
        };
    }

    /**
     * Delete a post
     * DELETE /newsfeed/posts/:id
     */
    @Delete('posts/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deletePost(@Request() req: any, @Param('id', ParseIntPipe) postId: number) {
        const userId = req.user.sub;
        await this.newsfeedService.deletePost(postId, userId);

        return {
            success: true,
            message: 'Post deleted successfully',
        };
    }

    /**
     * Like a post
     * POST /newsfeed/posts/:id/like
     */
    @Post('posts/:id/like')
    @HttpCode(HttpStatus.OK)
    async likePost(@Request() req: any, @Param('id', ParseIntPipe) postId: number) {
        const userId = req.user.sub;
        const like = await this.newsfeedService.likePost(postId, userId);

        // Get the updated post with correct is_liked status
        const updatedPost = await this.newsfeedService.getPostById(postId, userId);

        // If like is null, it means the post was unliked (toggled from liked to unliked)
        if (like === null) {
            return {
                success: true,
                message: 'Post unliked successfully',
                data: updatedPost,
            };
        }

        return {
            success: true,
            data: updatedPost,
        };
    }

    /**
     * Unlike a post
     * DELETE /newsfeed/posts/:id/like
     */
    @Delete('posts/:id/like')
    @HttpCode(HttpStatus.OK)
    async unlikePost(@Request() req: any, @Param('id', ParseIntPipe) postId: number) {
        const userId = req.user.sub;
        await this.newsfeedService.unlikePost(postId, userId);

        // Get the updated post with correct is_liked status
        const updatedPost = await this.newsfeedService.getPostById(postId, userId);

        return {
            success: true,
            message: 'Post unliked successfully',
            data: updatedPost,
        };
    }

    /**
     * Comment on a post
     * POST /newsfeed/posts/:id/comments
     */
    @Post('posts/:id/comments')
    @HttpCode(HttpStatus.CREATED)
    async commentOnPost(
        @Request() req: any,
        @Param('id', ParseIntPipe) postId: number,
        @Body() dto: CreateCommentDto,
    ) {
        const userId = req.user.sub;
        const comment = await this.newsfeedService.commentOnPost(postId, userId, dto);

        return {
            success: true,
            data: comment,
        };
    }

    /**
     * Get comments for a post
     * GET /newsfeed/posts/:id/comments?limit=20&offset=0&parentCommentId=123
     */
    @Get('posts/:id/comments')
    async getPostComments(
        @Param('id', ParseIntPipe) postId: number,
        @Query('limit') limit?: string,
        @Query('offset') offset?: string,
        @Query('parentCommentId') parentCommentId?: string,
    ) {
        const result = await this.newsfeedService.getPostComments(
            postId,
            limit ? parseInt(limit, 10) : 20,
            offset ? parseInt(offset, 10) : 0,
            parentCommentId ? parseInt(parentCommentId, 10) : undefined,
        );

        return {
            success: true,
            data: result.comments,
            total: result.total,
            hasMore: result.hasMore,
        };
    }

    /**
     * Delete a comment
     * DELETE /newsfeed/comments/:id
     */
    @Delete('comments/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteComment(@Request() req: any, @Param('id', ParseIntPipe) commentId: number) {
        const userId = req.user.sub;
        await this.newsfeedService.deleteComment(commentId, userId);

        return {
            success: true,
            message: 'Comment deleted successfully',
        };
    }

    /**
     * Share a post
     * POST /newsfeed/posts/:id/share
     */
    @Post('posts/:id/share')
    @HttpCode(HttpStatus.CREATED)
    async sharePost(
        @Request() req: any,
        @Param('id', ParseIntPipe) postId: number,
        @Body() dto: CreateShareDto,
    ) {
        const userId = req.user.sub;
        const share = await this.newsfeedService.sharePost(postId, userId, dto);

        return {
            success: true,
            data: share,
        };
    }

    /**
     * Get users who liked a post
     * GET /newsfeed/posts/:id/likes?limit=50&offset=0
     */
    @Get('posts/:id/likes')
    async getPostLikes(
        @Param('id', ParseIntPipe) postId: number,
        @Query('limit') limit?: string,
        @Query('offset') offset?: string,
    ) {
        const result = await this.newsfeedService.getPostLikes(
            postId,
            limit ? parseInt(limit, 10) : 50,
            offset ? parseInt(offset, 10) : 0,
        );

        return {
            success: true,
            data: result.likes,
            total: result.total,
            hasMore: result.hasMore,
        };
    }
}

