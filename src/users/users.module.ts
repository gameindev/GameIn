/* eslint-disable */
import { forwardRef, Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./providers/users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { CreatorProfilesModule } from "src/creator-profiles/creator-profiles.module";
import { BrandProfilesModule } from "src/brand-profiles/brand-profiles.module";
import { AuthModule } from "src/auth/auth.module";
import { CreateUserProvider } from './providers/create-user.provider';
import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email.provider';
import { UpdateUserProvider } from './providers/update-user.provider';
import { FindOneByIdentifierProvider } from './providers/find-one-by-identifier.provider';


/**
 * Users module.
 */
@Module({
    controllers: [UsersController],
    providers: [
        UsersService,
        CreateUserProvider,
        FindOneUserByEmailProvider,
        UpdateUserProvider,
        FindOneByIdentifierProvider,        
    ],
    exports: [UsersService],
    imports: [
        TypeOrmModule.forFeature([User]),
        CreatorProfilesModule,
        BrandProfilesModule,
        forwardRef(() => AuthModule),
    ],
})
export class UsersModule {}
