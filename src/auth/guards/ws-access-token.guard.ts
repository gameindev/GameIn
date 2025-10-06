import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';

@Injectable()
export class WsAccessTokenGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const client = context.switchToWs().getClient<Socket>();
        const token = this.extractToken(client);

        if (!token) {
            throw new UnauthorizedException('Missing authentication token');
        }

        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                this.jwtConfiguration,
            );
            // Attach user to socket for downstream handlers
            client.data = client.data || {};
            (client.data as any).user = payload;
        } catch {
            throw new UnauthorizedException('Invalid or expired token');
        }

        return true;
    }

    private extractToken(client: Socket): string | undefined {
        const authHeader = client.handshake.headers?.authorization as
            | string
            | undefined;
        if (authHeader) {
            const [type, token] = authHeader.split(' ');
            if (type?.toLowerCase() === 'bearer' && token) return token;
        }

        const auth = client.handshake.auth as Record<string, unknown> | undefined;
        if (auth && typeof auth['token'] === 'string') return auth['token'];

        const q = client.handshake.query as Record<string, unknown> | undefined;
        const qToken = q?.['token'];
        if (typeof qToken === 'string') return qToken;
        if (Array.isArray(qToken) && qToken.length > 0) return String(qToken[0]);

        return undefined;
    }
}

