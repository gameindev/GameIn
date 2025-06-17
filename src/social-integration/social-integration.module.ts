import { Module } from '@nestjs/common';
import { SocialIntegrationController } from './social-integration.controller';
import { SocialIntegrationService } from './providers/social-integration.service';
import { SocialIntegration } from './social-integration.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TwitchModule } from './twitch/twitch.module';

@Module({
    controllers: [SocialIntegrationController],
    providers: [SocialIntegrationService],
    imports: [
        TypeOrmModule.forFeature([SocialIntegration]),
        TwitchModule,
    ],
    exports: [SocialIntegrationService],
})
export class SocialIntegrationModule { }
