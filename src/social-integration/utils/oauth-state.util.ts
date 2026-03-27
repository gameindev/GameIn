import { createHash, createHmac, randomBytes, timingSafeEqual } from 'crypto';
import { SocialPlatform } from '../enums/social-platform.enums';

const DEFAULT_TTL_SEC = 900;

export type OAuthStatePayload = {
    sub: number;
    platform: SocialPlatform;
    exp: number;
    jti: string;
    /** X (Twitter) PKCE code_verifier; embedded so callback needs no server-side store. */
    pkce_verifier?: string;
};

function stateSecret(): string {
    const s = (process.env.OAUTH_STATE_SECRET || process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET || '').trim();
    if (!s) {
        throw new Error('Set OAUTH_STATE_SECRET (or JWT_ACCESS_SECRET / JWT_SECRET) for social OAuth state signing.');
    }
    return s;
}

export function signOAuthState(
    payload: Pick<OAuthStatePayload, 'sub' | 'platform'> & Partial<Pick<OAuthStatePayload, 'pkce_verifier' | 'exp' | 'jti'>>,
): string {
    const jti = payload.jti ?? randomBytes(16).toString('hex');
    const exp = payload.exp ?? Math.floor(Date.now() / 1000) + DEFAULT_TTL_SEC;
    const body: OAuthStatePayload = {
        sub: payload.sub,
        platform: payload.platform,
        exp,
        jti,
        pkce_verifier: payload.pkce_verifier,
    };
    const b64 = Buffer.from(JSON.stringify(body), 'utf8').toString('base64url');
    const sig = createHmac('sha256', stateSecret()).update(b64).digest('base64url');
    return `${b64}.${sig}`;
}

export function verifyOAuthState(stateToken: string, expectedPlatform: SocialPlatform): OAuthStatePayload {
    const dot = stateToken.indexOf('.');
    if (dot <= 0) throw new Error('Invalid OAuth state');
    const b64 = stateToken.slice(0, dot);
    const sig = stateToken.slice(dot + 1);
    const expectedSig = createHmac('sha256', stateSecret()).update(b64).digest('base64url');
    const a = Buffer.from(sig, 'utf8');
    const b = Buffer.from(expectedSig, 'utf8');
    if (a.length !== b.length || !timingSafeEqual(a, b)) throw new Error('Invalid OAuth state signature');
    const body = JSON.parse(Buffer.from(b64, 'base64url').toString('utf8')) as OAuthStatePayload;
    if (body.exp < Math.floor(Date.now() / 1000)) throw new Error('OAuth state expired');
    if (body.platform !== expectedPlatform) throw new Error('OAuth state platform mismatch');
    return body;
}

export function newPkceVerifier(): string {
    return randomBytes(32).toString('base64url');
}

export function pkceChallengeS256(verifier: string): string {
    return createHash('sha256').update(verifier).digest('base64url');
}
