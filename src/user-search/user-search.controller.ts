import { ClassSerializerInterceptor, Controller, Get, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserSearchService } from './providers/user-search.service';
import { UserSearchDto } from './dtos/user-search.dto';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
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
    
    @ApiProperty({
        description: 'Sign In',
        type: UserSearchDto,
    })
        @ApiQuery({
            name: 'keyword',
            required: false,
            type: UserSearchDto,
        })
    @ApiOperation({
        summary: 'Search users by keyword, userType, and country',
        description: `
            This endpoint allows you to search for users based on the provided search criteria.
            You can search for users by keyword, userType, and country.
            The search is case-insensitive and supports partial matches.
            The results are paginated, with the number of results per page and the current page number specified in the query parameters.
            The results are sorted by relevance.
            The results are returned as a paginated list of User objects.

            ### Example Usage:
             - GET /search/users?keyword=John&userType=BRAND&country=USA
             - GET /search/users?keyword=John&userType=COMMUNITY&country=USA
             - GET /search/users?keyword=John&userType=ADMIN&country=USA
             - GET /search/users?keyword=john&page=2&limit=5
             - GET /search/users?keyword=gaming      
            `
    })
    @ApiResponse({
        status: 200,
        description: `Search results returned successfully`
    })
    @Get('users')
    @ApiBearerAuth()
    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(UserTypeGuard)
    @UserTypes(UserType.ADMIN, UserType.CREATOR, UserType.BRAND, UserType.COMMUNITY)
    public async searchUsers(@Query() userSearchDto: UserSearchDto) {
        return await this.userSearchService.searchUsers(userSearchDto);
    }
}
