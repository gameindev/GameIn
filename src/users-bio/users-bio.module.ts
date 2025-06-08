import { Module } from '@nestjs/common';
import { UsersBioController } from './users-bio.controller';
import { UsersBioService } from './providers/users-bio.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBio } from './user-bio.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserBio])],
    controllers: [UsersBioController],
    providers: [UsersBioService],
    exports: [UsersBioService, TypeOrmModule],
})
export class UsersBioModule { }
 