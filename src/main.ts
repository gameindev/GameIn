/* eslint-disable */
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DataResponseInterceptor } from "./common/interceptors/data-response/data-response.interceptor";
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { IoAdapter } from "@nestjs/platform-socket.io";

async function bootstrap() {
    // ✅ USE NestExpressApplication here
    const isProduction = process.env.NODE_ENV === 'production';
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        logger: isProduction ? ['error', 'warn'] : ['log', 'error', 'warn', 'debug', 'verbose'],
    });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            }
        })
    );

    app.setGlobalPrefix(process.env.API_PREFIX ?? "api");

    if (!isProduction || process.env.ENABLE_SWAGGER === 'true') {
        const config = new DocumentBuilder()
            .setTitle("GameIn Sponsorship API")
            .setDescription("API documentation for the GameIn platform")
            .setTermsOfService(process.env.HOST ? `${process.env.HOST}/terms-of-service` : 'http://localhost:3000/terms-of-service')
            .addServer(process.env.HOST ?? 'http://localhost:3000/')
            .setVersion(process.env.API_VERSION ?? "1.0")
            .addBearerAuth()
            .addOAuth2({
                type: "oauth2",
                flows: {
                    authorizationCode: {
                        authorizationUrl: `https://accounts.google.com/o/oauth2/v2/auth`,
                        tokenUrl: "https://oauth2.googleapis.com/token",
                        scopes: {
                            profile: "Access profile information",
                            email: "Access email information"
                        }
                    }
                }
            })
            .build();

        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup("api/docs", app, document);
    }

    const allowedOrigins = (process.env.CORS_ORIGINS?.split(',').map(o => o.trim()).filter(Boolean)) || [
        "https://gameindev.github.io",
        "http://localhost:5173",
        "http://localhost:5174",
        "https://grvroy.com/",
    ];
    app.enableCors({
        origin: allowedOrigins,
        methods: process.env.CORS_METHODS ?? "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
        allowedHeaders: process.env.CORS_ALLOWED_HEADERS,
        exposedHeaders: process.env.CORS_EXPOSED_HEADERS,
    });

    if (process.env.TRUST_PROXY === 'true') {
        app.set('trust proxy', 1);
    }

    app.enableShutdownHooks();

    // const redisAdapter = new RedisIoAdapter(app);
    // await redisAdapter.connectToRedis();       // connect first (await!)
    // app.useWebSocketAdapter(redisAdapter);

    // ✅ Serve static assets
    app.useStaticAssets(join(process.cwd(), 'media/uploads'), {
        prefix: '/uploads/',
    });


    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();





