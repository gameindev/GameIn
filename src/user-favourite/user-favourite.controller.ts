import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { UserFavouriteService } from './providers/user-favourite.service';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiResponse } from '@nestjs/swagger';



@Controller('user-favourite')
@ApiBearerAuth()
export class UserFavouriteController {

    constructor(private readonly userFavouriteService: UserFavouriteService) { }
    
    @ApiOperation({ summary: 'Add a favourite user' })
    @ApiResponse({ status: 201, description: 'Favourite user added successfully' })
    @ApiProperty({ description: 'User ID to add as favourite', type: Number })
    @Post('add')
    async addFavourite(@Body() body: { user_id: number, favourite_user_id: number }) {
        return this.userFavouriteService.addFavourite(body.user_id, body.favourite_user_id);
    }


    @ApiOperation({ summary: 'Remove a favourite user' })
    @ApiResponse({ status: 200, description: 'Favourite user removed successfully' })
    @ApiProperty({ description: 'User ID to remove as favourite', type: Number })
    @Delete('remove')
    async removeFavourite(@Body() body: { user_id: number, favourite_user_id: number }) {
        return this.userFavouriteService.removeFavourite(body.user_id, body.favourite_user_id);
    }


    @ApiOperation({ summary: 'List all favourites' })
    @ApiResponse({ status: 200, description: 'Favourites listed successfully' })
    @ApiProperty({ description: 'User ID to list favourites', type: Number })
    @Post('list')
    async listFavourites(@Body() body: { user_id: number }) {
        return this.userFavouriteService.listFavourites(body.user_id);
    }

}
