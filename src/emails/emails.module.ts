import { Module, Provider } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { EmailsController } from './emails.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import smtpConfig from './config/smtp.config';
import { SesEmailProvider } from './providers/ses-email.provider';
import { SmtpEmailProvider } from './providers/smtp-email.provider';
import sesConfig from './config/ses.config';


const EmailProviderFactory: Provider = {
    provide: 'EmailProviderInterface',
    inject: [ConfigService],
    useFactory: (config: ConfigService) => {
        const strategy = (config.get<string>('appConfig.emailStrategy') || config.get<string>('EMAIL_STRATEGY') || 'smtp').toLowerCase();

        switch (strategy) {
            case 'ses':
                return new SesEmailProvider(sesConfig());
            case 'smtp':
            default:
                return new SmtpEmailProvider(smtpConfig());
        }
    }
}

@Module({
    providers: [EmailsService, EmailProviderFactory],
    controllers: [EmailsController],
    exports: [EmailsService],
    imports: [
        
    ]
})
export class EmailsModule { }
