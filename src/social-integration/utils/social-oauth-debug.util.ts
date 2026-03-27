import { Logger } from '@nestjs/common';

/** Set `SOCIAL_OAUTH_DEBUG=1` (or `true`) to log OAuth flow steps (no tokens). */
export function socialOauthDebugEnabled(): boolean {
    const v = (process.env.SOCIAL_OAUTH_DEBUG || '').toLowerCase().trim();
    return v === '1' || v === 'true' || v === 'yes';
}

export function socialDebugLog(logger: Logger, platform: string, message: string, meta?: Record<string, unknown>): void {
    if (!socialOauthDebugEnabled()) return;
    const suffix = meta && Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
    logger.log(`[Social:${platform}] ${message}${suffix}`);
}

/** Always log failures (safe: no access_token / refresh_token / client_secret). */
export function socialErrorLog(logger: Logger, platform: string, phase: string, err: unknown): void {
    const e = err as any;
    const status = e?.response?.status ?? e?.status ?? e?.statusCode;
    const data = e?.response?.data;
    const msg = e?.message ?? String(err);
    let body = '';
    if (typeof data === 'string') body = data.slice(0, 1200);
    else if (data != null)
        try {
            body = JSON.stringify(data).slice(0, 1200);
        } catch {
            body = '[unserializable]';
        }
    logger.warn(
        `[Social:${platform}] ${phase}: ${msg}${status != null ? ` httpStatus=${status}` : ''}${body ? ` response=${body}` : ''}`,
    );
}

export function maskClientId(id: string | undefined): string {
    if (!id) return '(empty)';
    if (id.length <= 10) return `${id.slice(0, 3)}…`;
    return `${id.slice(0, 6)}…${id.slice(-4)}`;
}
