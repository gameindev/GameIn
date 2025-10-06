import {
    Controller,
    Post,
    Body,
    Param,
    ParseIntPipe,
    Delete,
    Get,
    UseInterceptors,
    ClassSerializerInterceptor,
    BadRequestException,
} from '@nestjs/common';
import { FollowDto } from './dtos/follow.dto';
import { UserFollowService } from './providers/user-follow.service';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ActiveUser } from '../auth/decorators/active-user.decorator';
import { ActiveUserData } from '../auth/interfaces/active-user-data.interface';


@ApiTags('User-Follow')
@Controller('users')
export class UserFollowController {
    constructor(private readonly followService: UserFollowService) { }

    /**
     * 
     * @param user 
     * @param dto 
     * @returns 
     */
    @ApiOperation({
        summary: 'Follow a user by ID',
    })
    @ApiResponse({
        status: 201,
        description: 'User followed successfully',
    })
    @ApiBearerAuth()
    @UseInterceptors(ClassSerializerInterceptor)
    @Post('follow')
    async follow(
        @ActiveUser() user: ActiveUserData,
        @Body() dto: FollowDto,
    ) {
        if (dto.following_id == user.sub) {
            throw new BadRequestException('Self following is not allowed!');
        }
        return this.followService.follow(user.sub, dto);
    }


    /**
     * 
     * @param user 
     * @param following_id 
     * @returns 
     */
    @ApiOperation({
        summary: 'Unfollow a user by ID',
    })
    @ApiResponse({
        status: 200,
        description: 'User unfollowed successfully',
    })
    @ApiBearerAuth()
    @Delete(':followingId/follow')
    async unfollow(
        @ActiveUser() user: ActiveUserData,
        @Param('followingId', ParseIntPipe) followingId: number,
    ) {
        return this.followService.unfollow(user.sub, followingId);
    }


    /**
     * 
     */
    @ApiOperation({
        summary: 'Get a list of users followed by a user',
    })
    @ApiResponse({
        status: 200,
        description: 'List of users followed by the user',
    })
    @ApiProperty({
        description: 'User ID to get followers',
        type: Number,
    })
    @ApiBearerAuth()
    @Get(':id/followers')
    @UseInterceptors(ClassSerializerInterceptor)
    async getFollowers(
        @Param('id', ParseIntPipe) userId: number
    ) {
        return this.followService.getFollowers(userId);
    }


    /**
     * 
     */
    @ApiOperation({
        summary: 'Get a list of users following a user',
    })
    @ApiResponse({
        status: 200,
        description: 'List of users following the user',
    })
    @ApiProperty({
        description: 'User ID to get following',
        type: Number,
    })
    @Get(':id/following')
    @ApiBearerAuth()
    @UseInterceptors(ClassSerializerInterceptor)
    async getFollowing(
        @Param('id', ParseIntPipe) userId: number
    ) {
        return this.followService.getFollowing(userId);
    }
}
