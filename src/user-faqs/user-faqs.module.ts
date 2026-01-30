import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFaqsController } from './user-faqs.controller';
import { UserFaqsService } from './providers/user-faqs.service';
import { UserFaq } from './user-faq.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserFaq]),
        AuthModule, // Import AuthModule to get JwtModule
    ],
    controllers: [UserFaqsController],
    providers: [UserFaqsService],
    exports: [UserFaqsService, TypeOrmModule],
})
export class UserFaqsModule {}

