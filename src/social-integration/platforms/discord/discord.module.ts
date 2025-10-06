import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import discordConfig from './discord.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialIntegration } from '../../entities/social-integration.entity';
import { User } from '../../../users/user.entity';
import { UsersModule } from '../../../users/users.module';

@Module({
    providers: [DiscordService],
    exports: [DiscordService],
    imports: [
        HttpModule,
        ConfigModule.forFeature(discordConfig),
        TypeOrmModule.forFeature([SocialIntegration, User]),
        UsersModule
    ]
})
export class DiscordModule {}
