import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EmailsService } from './emails.service';

@Controller('emails')
export class EmailsController {
    constructor(private readonly emails: EmailsService) { }

    @ApiOperation({ summary: 'Send a test email (DEV only)' })
    @ApiResponse({
        status: 200,
        description: 'Email send successfully',
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                to: { type: 'string' },
                subject: { type: 'string', nullable: true }
            },
            required: ['to']
        }
    })
    @ApiBearerAuth()
    @Post('test')
    async test(@Body() body: { to: string; subject?: string }) {
        const { to, subject = 'Hello from GameIn' } = body;
        return this.emails.sendRaw({
            to,
            subject,
            html: `<p>If you can read this, email works 🎉</p>`,
            text: 'If you can read this, email works.',
        });
    }
}
