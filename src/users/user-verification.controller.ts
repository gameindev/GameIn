import { Controller, Get, Post, Query } from '@nestjs/common';
import { UsersService } from './providers/users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorators/auth.decorator';
import { AuthType } from '../auth/enums/auth-type.enum';

@Controller('user-verification')
@ApiTags('User Verification')
/**
 * User verification controller.
 */
@Auth(AuthType.None)
export class UserVerificationController {
    constructor(private readonly usersService: UsersService,) { }
   


    @ApiOperation({
        summary: 'Resends a verification email to the user.'
    })
    @ApiResponse({
        status: 200,
        description: 'Verification email resent successfully',
    })
    @Post('/resend-verification-email')
    resendVerificationEmail(
        @Query('email') email: string,
    ) {
        return this.usersService.sendVerificationEmail(email);
    }



    @ApiOperation({
        summary: 'Verifies a user\'s email.'
    })
    @ApiResponse({
        status: 200,
        description: 'Email verified successfully',
    })
    @Get('/verify-email')
    @Auth(AuthType.None)
    verifyEmail(
        @Query('token') token: string,
    ) {
        return this.usersService.verifyEmail(token);
    }
}
