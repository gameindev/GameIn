/* eslint-disable */
import { Body, ClassSerializerInterceptor, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetUsersParamDto } from "./dtos/get-user-param.dto";
import { CreateUserDto } from "./dtos/post-create-user.dto";
import { PatchUserDto } from "./dtos/patch-user.dto";
import { UsersService } from "./providers/users.service";
import { AccessTokenGuard } from "src/auth/guards/access-token/access-token.guard";
import { Auth } from "src/auth/decorators/auth.decorator";
import { AuthType } from "src/auth/enums/auth-type.enum";
import { ActiveUser } from "src/auth/decorators/active-user.decorator";
import { ActiveUserData } from "src/auth/interfaces/active-user-data.interface";
import { PathcUserRoleDto } from "./dtos/patch-user-role.dto";




@Controller("users")
@ApiTags("Users")
/**
* Users controller.
*/
export class UsersController {

    constructor(
        /**
         * Injecting Users service.
         */
        private readonly usersService: UsersService,
    ) {

    }


    /**
     * Fetches a list of registered users on the application.
     * @query limit The number of users per page
     * @query page The page number to fetch
     * @query populate Optional relations to include (creatorProfile, brandProfile, etc.)
     * @returns Users with pagination and optional relations
     */
    @Get()
    @ApiOperation({
        summary: 'Fetches a list of registered users on the application.',
        description: `
    Returns paginated users. Use the 'populate' query param to load related entities.

    - Use \`populate=creatorProfile\`, \`brandProfile\`, etc. to include specific relations
    - Use \`populate=*\` to include all supported relations dynamically
  `,
    })
    @ApiQuery({
        name: 'limit',
        type: Number,
        description: 'The number of users per page (pagination limit)',
        required: false,
        example: 10,
    })
    @ApiQuery({
        name: 'page',
        type: Number,
        description: 'The page number to fetch',
        required: false,
        example: 1,
    })
    @ApiQuery({
        name: 'populate',
        type: String,
        required: false,
        description: `Comma-separated list of relations to include.
Options depend on valid relations in User entity, e.g.:
  - creatorProfile
  - brandProfile

Use '*' to load all supported relations.`,
        example: 'creatorProfile,ratingsGiven',
    })
    @ApiResponse({
        status: 200,
        description: 'Users fetched successfully based on the query',
    })    
    @Auth(AuthType.None)
    @UseInterceptors(ClassSerializerInterceptor)  
    getUsers(
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('populate') populate?: string,
    ) {
        return this.usersService.getAllUsers(limit, page, populate);
    }


    /**
    * Fetches a registered user on the application by ID.
    * @param email The ID of the user that you want the API to return
    * @returns User fetched successfully based on the query
    */
    @ApiOperation({
        summary: 'Fetches a registered user on the application by email.',
    })
    @ApiQuery({
        name: 'email',
        type: String,
        description: 'The email of the user to fetch',
        required: true,
    })
    @ApiResponse({
        status: 200,
        description: 'User fetched successfully based on the query.',
    })

    // @UseGuards(AccessTokenGuard)
    @Get('/by-email')
    @Auth(AuthType.None)
    @UseInterceptors(ClassSerializerInterceptor)  
    getUserByEmail(
        @Query() email: string,
    ) {
        return this.usersService.findUserOneByEmail(email);
    }


    /**
    * Fetches a registered user on the application by ID.
    * @param getUserParamDto The ID of the user that you want the API to return
    * @returns User fetched successfully based on the query
    */
    @ApiOperation({
        summary: 'Fetches a registered user on the application by ID.',
        description: `
      Returns user data by ID. You can optionally include related entities using the \`populate\` query param.
      
      ### Populate Options:
      - \`creatorProfile\`: Include Creator Profile (for users with userType: CREATOR)
      - \`brandProfile\`: Include Brand Profile (if applicable)
      - \`ratingsGiven\`: Ratings this user has given
      - \`ratingsReceived\`: Ratings this user has received
      - \`userFaqs\`: FAQs associated with the user
      - \`*\`: Include all supported relations
      
      Use comma-separated values to load multiple relations.
        `,
    })
    @ApiParam({
        name: 'id',
        type: Number,
        description: 'The ID of the user to fetch',
        required: true,
    })
    @ApiQuery({
        name: 'populate',
        required: false,
        type: String,
        description: `Optional. Comma-separated list of valid relation keys.
      Only valid relations on the User entity will be included. Invalid values will be ignored.`,
        example: 'creatorProfile,ratingsReceived',
    })
    @ApiResponse({
        status: 200,
        description: 'User fetched successfully based on the query.',
    })

    // @UseGuards(AccessTokenGuard)
    @Get("/:id")
    getUserById(
        @Param() getUserParamDto: GetUsersParamDto,
        @Query('populate') populate?: string,
    ) {
        return this.usersService.getUserById(getUserParamDto.id, populate);
    }




    /**
     * Creates a new user on the application.
     * @param createUserDto The user details that you want the API to return
     * @returns User created successfully based on the query
     */
    @Post()
    @ApiOperation({
        summary: 'Creates a new user on the application.'
    })
    @ApiResponse({
        status: 201,
        description: 'User created successfully based on the query',
    })
    @Auth(AuthType.None)  
    @UseInterceptors(ClassSerializerInterceptor)    
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }



    /**
     * Updates a registered user on the application.
     * @param patchUserDto The user details that you want the API to return
     * @returns User updated successfully based on the query
     */
    @Patch()
    @ApiOperation({
        summary: 'Updates a registered user on the application by ID.'
    })
    @ApiResponse({
        status: 200,
        description: 'User updated successfully based on the query',
    })    
    @UseInterceptors(ClassSerializerInterceptor)  
    updateUser(
        @Body() patchUserDto: PatchUserDto,
        @ActiveUser() user: ActiveUserData
    ) {
        return this.usersService.updateUser(patchUserDto, user);
    }




    /**
     * Assigns a role to an OAuth user
     * @param patchUserRoleDto 
     * @returns 
     */
    @ApiBearerAuth()
    @ApiTags('auth')
    @ApiOperation({
        summary: 'Assigns a role to an OAuth user'
    })
    @ApiResponse({
        status: 200,
        description: 'Role assigned successfully'
    })
    @Patch('/assign-role')
    @UseInterceptors(ClassSerializerInterceptor)  
    assignUserTypeToOAuthUser(
        @Body() patchUserRoleDto: PathcUserRoleDto,
        @ActiveUser() userSub: ActiveUserData
    ) {
        return this.usersService.updateOAuthUserRole(patchUserRoleDto, userSub);
    }



    /**
     * Soft deletes a registered user on the application.
     * @param getUserParamDto The ID of the user that you want the API to return
     * @returns Return a success message
     */
    @Delete("/:id/soft-delete")
    @ApiOperation({
        summary: 'Soft Deletes a registered user on the application by ID.'
    })
    @ApiResponse({
        status: 200,
        description: 'User soft deleted successfully based on the query',
    })
    @UseInterceptors(ClassSerializerInterceptor)  
    softDeleteUser(@Param() getUserParamDto: GetUsersParamDto) {
        return this.usersService.softDeleteUser(getUserParamDto.id);
    }




    /**
     * Permanently deletes a registered user on the application.
     * @param getUserParamDto The ID of the user that you want the API to return
     * @returns Return a success message
     */
    @Delete("/:id")
    @UseInterceptors(ClassSerializerInterceptor)  
    @ApiOperation({
        summary: 'Deletes a registered user on the application by ID.'
    })
    @ApiResponse({
        status: 200,
        description: 'User deleted successfully based on the query',
    })
    deleteUser(@Param() getUserParamDto: GetUsersParamDto) {
        return this.usersService.deleteUser(getUserParamDto.id);
    }



}
