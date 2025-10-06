import { Module } from '@nestjs/common';
import { XService } from './x.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import xConfig from './x.config';
import { SocialIntegration } from '@/social-integration/entities/social-integration.entity';
import { User } from '@/users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@/users/users.module';

@Module({
    providers: [XService],
    exports: [XService],
    imports: [
        HttpModule,
        ConfigModule.forFeature(xConfig),
        TypeOrmModule.forFeature([SocialIntegration, User]),
        UsersModule
    ],
})
export class XModule {}
