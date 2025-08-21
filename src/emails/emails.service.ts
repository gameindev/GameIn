import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { EmailProviderInterface, SendOptions } from './interfaces/email-provider.interface';
import * as fs from 'fs';
import * as path from 'path';
import appConfig from 'src/config/app.config';
import Handlebars from 'handlebars';

@Injectable()
export class EmailsService {
    private readonly logger = new Logger(EmailsService.name);
    private readonly templateDir: string;
    private readonly defaultFrom: string;

    constructor(
        @Inject(appConfig.KEY)
        private readonly config: ConfigType<typeof appConfig>,
        @Inject('EmailProviderInterface')
        private readonly provider: EmailProviderInterface,
    ) {
        this.templateDir = this.config.emailTemplateDirectory
            || path.resolve(__dirname, 'templates');
        this.defaultFrom =
            this.config.emailFrom || 'no-reply@example.com';
    }


    /**
   * Send a raw email (no template)
   */
    async sendRaw(options: SendOptions) {
        const payload = { from: this.defaultFrom, ...options };
        const res = await this.provider.send(payload);
        this.logger.log(`Email sent via ${res.provider} id=${res.messageId}`);
        return res;
    }


    /**
   * Render a Handlebars template by name with variables and send.
   */
    async sendTemplate(
        templateName: string,
        vars: Record<string, any>,
        options: Omit<SendOptions, 'html' | 'text'> & { textFallback?: string } // optional plain text fallback
    ) {
        const html = await this.renderTemplate(templateName, vars);
        const { textFallback, ...rest } = options;

        return this.sendRaw({
            ...rest,
            html,
            text: textFallback,
        });
    }


    private async renderTemplate(templateName: string, vars: Record<string, any>): Promise<string> {
        const filePath = path.join(this.templateDir, `${templateName}.hbs`);
        const basePath = path.join(this.templateDir, 'base.hbs');

        const [templateSrc, baseSrc] = await Promise.all([
            fs.promises.readFile(filePath, 'utf8'),
            fs.promises.readFile(basePath, 'utf8').catch(() => '{{{body}}}'), // fallback if no base.hbs
        ]);

        const base = Handlebars.compile(baseSrc);
        const body = Handlebars.compile(templateSrc)(vars);

        return base({ ...vars, body });
    }
}
