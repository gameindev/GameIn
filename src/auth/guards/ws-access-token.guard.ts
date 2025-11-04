import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
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
            console.warn('❌ Missing authentication token from WS handshake');
            throw new UnauthorizedException('Missing authentication token');
        }

        try {
            // ✅ Explicitly verify using secret, issuer, audience
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.jwtConfiguration.secret,
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer,
            });

            // ✅ Attach useful fields to client.data
            client.data.user = payload;
            client.data.user_id = payload.sub;
            client.data.username = payload.username;
            client.data.email = payload.email;
            client.data.user_type = payload.user_type;

            console.log(`✅ WS Auth OK for user ${payload.username} (${payload.sub})`);
            return true;
        } catch (error) {
            console.error('❌ WS token validation failed:', error.message);
            throw new UnauthorizedException('Invalid or expired token');
        }
    }

    /**
     * Extracts JWT from:
     *  1. handshake.headers.authorization (Bearer ...)
     *  2. handshake.auth.token
     *  3. handshake.query.token
     */
    private extractToken(client: Socket): string | undefined {
        // 1️⃣ From headers
        const authHeader = client.handshake.headers?.authorization;
        if (authHeader && typeof authHeader === 'string') {
            const [type, token] = authHeader.split(' ');
            if (type?.toLowerCase() === 'bearer' && token) return token;
        }

        // 2️⃣ From handshake.auth (used by frontend)
        const auth = client.handshake.auth as Record<string, unknown> | undefined;
        if (auth && typeof auth['token'] === 'string') {
            const bearer = auth['token'] as string;
            return bearer.startsWith('Bearer ') ? bearer.split(' ')[1] : bearer;
        }

        // 3️⃣ From query param (fallback)
        const q = client.handshake.query as Record<string, unknown> | undefined;
        const qToken = q?.['token'];
        if (typeof qToken === 'string') return qToken;
        if (Array.isArray(qToken) && qToken.length > 0) return qToken[0];

        return undefined;
    }
}
