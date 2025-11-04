/* eslint-disable */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RedisIoAdapter } from './redis/redisIOAdaptor.service';

async function bootstrap() {
    const isProduction = process.env.NODE_ENV === 'production';
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        logger: isProduction ? ['error', 'warn'] : ['log', 'error', 'warn', 'debug'],
    });

    /** ------------------ 🛡 Global Pipes ------------------ */
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: { enableImplicitConversion: true },
        }),
    );

    /** ------------------ 🌍 Global Prefix ------------------ */
    app.setGlobalPrefix(process.env.API_PREFIX ?? 'api');

    /** ------------------ 📘 Swagger (only in dev or explicitly enabled) ------------------ */
    if (!isProduction || process.env.ENABLE_SWAGGER === 'true') {
        const host = process.env.HOST ?? (isProduction ? 'https://my-backend.ondigitalocean.app' : 'http://localhost:3000');
        const config = new DocumentBuilder()
            .setTitle('GameIn Sponsorship API')
            .setDescription('API documentation for the GameIn platform')
            .setTermsOfService(`${host}/terms-of-service`)
            .addServer(host)
            .setVersion(process.env.API_VERSION ?? '1.0')
            .addBearerAuth()
            .addOAuth2({
                type: 'oauth2',
                flows: {
                    authorizationCode: {
                        authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
                        tokenUrl: 'https://oauth2.googleapis.com/token',
                        scopes: {
                            profile: 'Access profile information',
                            email: 'Access email information',
                        },
                    },
                },
            })
            .build();

        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('api/docs', app, document);
    }

    /** ------------------ 🔐 CORS ------------------ */
    const allowedOrigins =
        process.env.CORS_ORIGINS?.split(',').map(o => o.trim()) || [
            'https://gamein.gg',
            'https://www.gamein.gg',
            'https://frontend-app-vn9qp.ondigitalocean.app',
        ];

    app.enableCors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error(`Origin ${origin} not allowed by CORS`));
            }
        },
        credentials: true, // ✅ required for cookies / auth headers
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'X-Requested-With',
            'x-captcha-token',
            'x-xsrf-token',
        ],
        exposedHeaders: [
            'Content-Type',
            'Authorization',
            'X-Requested-With',
        ],
    });

    /** ------------------ 🌐 Proxy / Headers ------------------ */
    app.set('trust proxy', 1);

    /** ------------------ 📁 Static Assets ------------------ */
    app.useStaticAssets(join(process.cwd(), 'media/uploads'), { prefix: '/uploads/' });

    const redisIoAdapter = new RedisIoAdapter(app);
    await redisIoAdapter.connectToRedis();

    app.useWebSocketAdapter(redisIoAdapter);

    /** ------------------ 🚀 Start Server ------------------ */
    await app.listen(process.env.PORT || 8080, '0.0.0.0');
    console.log(`🚀 Server running on port ${process.env.PORT || 8080}`);
}
bootstrap();
