import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialIntegration } from './entities/social-integration.entity';
import { SocialIntegrationController } from './social-integration.controller';
import { SocialIntegrationService } from './providers/social-integration.service';
import { SocialIntegrationProvider } from './providers/social-integration.provider';
import { TwitchModule } from './platforms/twitch/twitch.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([SocialIntegration]),
        TwitchModule,
    ],
    controllers: [SocialIntegrationController],
    providers: [SocialIntegrationService, SocialIntegrationProvider],
    exports: [SocialIntegrationService],
})
export class SocialIntegrationModule { }
