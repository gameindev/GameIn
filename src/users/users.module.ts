/* eslint-disable */
import { forwardRef, Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./providers/users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";

import { CreateUserProvider } from './providers/create-user.provider';
import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email.provider';
import { UpdateUserProvider } from './providers/update-user.provider';
import { FindOneByIdentifierProvider } from './providers/find-one-by-identifier.provider';
import { FindOneByGoogleIdProvider } from './providers/find-one-by-google-id.provider';
import { CreateGoogleUserProvider } from './providers/create-google-user.provider';
import { UpdateUserRoleProvider } from './providers/update-user-role.provider';
import { CheckOneByIdentifierProvider } from './providers/check-one-by-identifier.provider';
import { FindOneByUsernameProvider } from "./providers/find-user-by-username-provider";
import { CreatorProfilesModule } from "../creator-profiles/creator-profiles.module";
import { BrandProfilesModule } from "../brand-profiles/brand-profiles.module";
import { UsersBioModule } from "../users-bio/users-bio.module";
import { AuthModule } from "../auth/auth.module";
import { EmailsModule } from "../emails/emails.module";


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
        FindOneByGoogleIdProvider,
        CreateGoogleUserProvider,
        UpdateUserRoleProvider,
        CheckOneByIdentifierProvider,
        FindOneByUsernameProvider,
    ],
    exports: [UsersService],
    imports: [
        TypeOrmModule.forFeature([User]),
        CreatorProfilesModule,
        BrandProfilesModule,
        UsersBioModule,
        forwardRef(() => AuthModule),
        EmailsModule
    ],
})
export class UsersModule { }
