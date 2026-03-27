import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'crypto';
import { ValueTransformer } from 'typeorm';

const PREFIX = 'enc:v1:';
const ALGO = 'aes-256-gcm';

function keyFromSecret(secret: string): Buffer {
    return createHash('sha256').update(secret).digest();
}

function getSecret(): string {
    return (process.env.SOCIAL_TOKEN_ENCRYPTION_KEY || '').trim();
}

function encryptToken(plain: string): string {
    const secret = getSecret();
    if (!secret || !plain) return plain;

    const iv = randomBytes(12);
    const key = keyFromSecret(secret);
    const cipher = createCipheriv(ALGO, key, iv);
    const encrypted = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();
    return `${PREFIX}${iv.toString('base64')}:${tag.toString('base64')}:${encrypted.toString('base64')}`;
}

function decryptToken(value: string): string {
    const secret = getSecret();
    if (!secret || !value || !value.startsWith(PREFIX)) return value;

    const payload = value.slice(PREFIX.length);
    const [ivB64, tagB64, dataB64] = payload.split(':');
    if (!ivB64 || !tagB64 || !dataB64) return value;

    const key = keyFromSecret(secret);
    const iv = Buffer.from(ivB64, 'base64');
    const tag = Buffer.from(tagB64, 'base64');
    const encrypted = Buffer.from(dataB64, 'base64');

    const decipher = createDecipheriv(ALGO, key, iv);
    decipher.setAuthTag(tag);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted.toString('utf8');
}

export const tokenEncryptionTransformer: ValueTransformer = {
    to(value?: string | null): string | null {
        if (!value) return value ?? null;
        return encryptToken(value);
    },
    from(value?: string | null): string | null {
        if (!value) return value ?? null;
        return decryptToken(value);
    },
};
