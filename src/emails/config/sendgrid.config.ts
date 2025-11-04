
import { registerAs } from "@nestjs/config";

export default registerAs('sendgridConfig', () => {
    return {
        apiKey: process.env.SENDGRID_API_KEY,
        emailFrom: process.env.EMAIL_FROM || process.env.SENDGRID_FROM_EMAIL
    }
})

