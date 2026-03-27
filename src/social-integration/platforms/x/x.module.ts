import { Module } from '@nestjs/common';
import { XService } from './x.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import xConfig from './x.config';
import { SocialIntegration } from '../../entities/social-integration.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
    providers: [XService],
    exports: [XService],
    imports: [
        HttpModule,
        ConfigModule.forFeature(xConfig),
        TypeOrmModule.forFeature([SocialIntegration]),
    ],
})
export class XModule {}
