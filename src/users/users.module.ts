/* eslint-disable */
import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./providers/users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { ConfigModule } from "@nestjs/config";
import profileConfig from "./config/profile.config";
import { CreatorProfilesModule } from "src/creator-profiles/creator-profiles.module";
import { BrandProfilesModule } from "src/brand-profiles/brand-profiles.module";

/**
 * Users module.
 */
@Module({
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
    imports: [
        TypeOrmModule.forFeature([User]),
        CreatorProfilesModule,
        BrandProfilesModule
        // ConfigModule.forFeature(profileConfig),
    ],
})
export class UsersModule {}
