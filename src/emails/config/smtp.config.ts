
import { registerAs } from "@nestjs/config";

export default registerAs('smtpConfig', () => {
    return {
        smtpHost: process.env.SMTP_HOST,
        smtpPort: process.env.SMTP_PORT,
        smtpUser: process.env.SMTP_USER,
        smtpPassword: process.env.SMTP_PASS,
        smtpSecure: process.env.SMTP_SECURE,
        emailFrom: process.env.EMAIL_FROM
    }
})