import { Module } from '@nestjs/common';
import { InstagramService } from './instagram.service';
import { ConfigModule } from '@nestjs/config';
import instagramConfig from './instagram.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialIntegration } from '../../entities/social-integration.entity';

@Module({
  providers: [InstagramService],
  exports: [InstagramService],
  imports: [
    ConfigModule.forFeature(instagramConfig),
    TypeOrmModule.forFeature([SocialIntegration]),
  ],
})
export class InstagramModule {}
