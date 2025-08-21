
import { registerAs } from "@nestjs/config";

export default registerAs('sesConfig', () => {
    return {
        awsRegion: process.env.AWS_REGION,
        awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
        awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        awsSESSender: process.env.AWS_SES_SENDER,
        emailFrom: process.env.EMAIL_FROM
    }
})