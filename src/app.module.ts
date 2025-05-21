/* eslint-disable */

import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CreatorProfilesModule } from './creator-profiles/creator-profiles.module';
import { BrandProfilesModule } from './brand-profiles/brand-profiles.module';
import { AuthModule } from './auth/auth.module';
import appConfig from "./config/app.config";
import databaseConfig from "./config/database.config";
import * as dotenvFlow from 'dotenv-flow';
import environmentValidation from "./config/environment.validation";
dotenvFlow.config();

const ENV = process.env.NODE_ENV;

@Module({
    imports: [
        UsersModule,
        CreatorProfilesModule,
        BrandProfilesModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [`.env.${ENV}`, '.env'],
            load: [appConfig, databaseConfig],
            validationSchema: environmentValidation,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    type: "postgres", // Use the injected ConfigService t,
                    host: configService.get('database.host'), // Use the injected ConfigService t,
                    port: +configService.get('database.port'), // Use the injected ConfigService to get the value,
                    username: configService.get('database.username'), // Use the injected ConfigService t,
                    password: configService.get('database.password'),
                    database: configService.get('database.name'),
                    autoLoadEntities: configService.get('database.autoLoadEntities'),
                    synchronize: configService.get('database.synchronize')
                    // entities: [User, UserProfile]
                }
            }
        }),
        AuthModule,        
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule { }
