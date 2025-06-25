import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UserSearchService } from './providers/user-search.service';
import { UserSearchDto } from './dtos/user-search.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserTypeGuard } from 'src/auth/guards/user-type.guard';
import { UserType } from 'src/users/enums/user-type.enums';
import { UserTypes } from 'src/auth/decorators/user-types.decorator';

@ApiTags('Search')
@Controller('search')
export class UserSearchController {

    constructor(private readonly userSearchService: UserSearchService) { }

    /**
     * Search users by keyword, userType, and country
     * @query userSearchDto - UserSearchDto object containing search criteria
     * @returns - Search results and total count
     */
    @Get('users')
    @ApiBearerAuth()
    @UseGuards(UserTypeGuard)
    @UserTypes(UserType.ADMIN, UserType.CREATOR, UserType.BRAND, UserType.COMMUNITY)
    @ApiOperation({ summary: 'Search users by keyword, userType, and country' })
    @ApiResponse({ status: 200, description: 'Search results returned successfully' })
    public async searchUsers(@Query() userSearchDto: UserSearchDto) {
        return await this.userSearchService.searchUsers(userSearchDto);
    }
}
