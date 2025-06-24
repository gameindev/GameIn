import { Module } from '@nestjs/common';
import { UsersBioController } from './users-bio.controller';
import { UsersBioService } from './providers/users-bio.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBio } from './user-bio.entity';
import { MetadataModule } from 'src/metadata/metadata.module';
import { PreferredGamesModule } from 'src/preferred-games/preferred-games.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserBio]),
        MetadataModule,
        PreferredGamesModule,
    ],
    controllers: [UsersBioController],
    providers: [UsersBioService],
    exports: [UsersBioService, TypeOrmModule],
})
export class UsersBioModule { }
 