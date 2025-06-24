/* eslint-disable */
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { DataResponseInterceptor } from "./common/interceptors/data-response/data-response.interceptor";
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
    // ✅ USE NestExpressApplication here
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

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

    const config = new DocumentBuilder()
        .setTitle("GameIn Sponsorship API")
        .setDescription("API documentation for the GameIn platform")
        .setTermsOfService(process.env.HOST ? `${process.env.HOST}/terms-of-service` : 'http://localhost:3000/terms-of-service')
        .addServer(process.env.HOST ?? 'http://localhost:3000/')
        .setVersion(process.env.API_VERSION ?? "1.0")
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/docs", app, document);

    app.enableCors({
        origin: ["https://gameindev.github.io", "http://localhost:5173"],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
    });

    // ✅ Serve static assets
    app.useStaticAssets(join(process.cwd(), 'media/uploads'), {
        prefix: '/uploads/',
    });


    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
