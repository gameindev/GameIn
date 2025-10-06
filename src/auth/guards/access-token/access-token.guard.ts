import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import jwtConfig from '../../config/jwt.config';
import { REQUEST_USER_KEY } from '../../contants/auth.contants';

@Injectable()
export class AccessTokenGuard implements CanActivate {

    constructor(
        /**
         * Inject JWT Service
         */
        private readonly jwtService: JwtService,
        /**
         * Inject JWT Configuration
         */
        @Inject (jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    ) { }


    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        // Extract Request from Context
        const request = context.switchToHttp().getRequest();
        // Extract the token from the request headers
        const token = this.extractRequestFromHeader(request);
        //Validate the token
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            // Verify the token
            const payload = await this.jwtService.verifyAsync(
                token,
                this.jwtConfiguration
            );
            // Add the payload to the request
            request[REQUEST_USER_KEY] = payload;
            // console.log(payload);
        } catch {
            throw new UnauthorizedException();
        }

        return true;
    }

    private extractRequestFromHeader(request: Request) : string | undefined {
        // Extract the token from the request headers
        const [_, token] = request.headers.authorization?.split(' ') ?? [];
        return token;
    }
}
