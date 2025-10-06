/* eslint-disable */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const isProduction = process.env.NODE_ENV === 'production';
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        logger: isProduction ? ['error', 'warn'] : ['log', 'error', 'warn', 'debug', 'verbose'],
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
    const defaultOrigins = ['http://localhost:5173', 'http://localhost:5174', 'https://frontend-app-vn9qp.ondigitalocean.app'];
    const allowedOrigins =
        process.env.CORS_ORIGINS?.split(',').map((o) => o.trim()).filter(Boolean) || defaultOrigins;

    app.enableCors({
        origin: allowedOrigins,
        methods: process.env.CORS_METHODS ?? 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
        allowedHeaders:
            process.env.CORS_ALLOWED_HEADERS ??
            '*',
        exposedHeaders: process.env.CORS_EXPOSED_HEADERS,
    });

    /** ------------------ 🌐 Proxy / Headers ------------------ */
    if (process.env.TRUST_PROXY === 'true') {
        app.set('trust proxy', 1);
    }

    /** ------------------ 📁 Static Assets ------------------ */
    app.useStaticAssets(join(process.cwd(), 'media/uploads'), {
        prefix: '/uploads/',
    });

    /** ------------------ ⚡️ Start Server ------------------ */
    const port = process.env.PORT || (process.env.NODE_ENV === 'production' ? 8080 : 3000); // 8080 for DigitalOcean
    await app.listen(port);
    console.log(`🚀 Server running on port ${port} (${isProduction ? 'production' : 'development'})`);
}
bootstrap();
