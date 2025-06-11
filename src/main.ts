/* eslint-disable */
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { DataResponseInterceptor } from "./common/interceptors/data-response/data-response.interceptor";

/**
 * Bootstrap the application.
 */
async function bootstrap() {
    const app = await NestFactory.create(AppModule);

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

    // Set global prefix for all routes
    app.setGlobalPrefix(process.env.API_PREFIX ?? "api");

    // Swagger configuration
    const config = new DocumentBuilder()
        .setTitle("GameIn Sponsorship API")
        .setDescription("API documentation for the GameIn platform")
        .setTermsOfService(process.env.HOST ? `${process.env.HOST}/terms-of-service` : 'http://localhost:3000/terms-of-service')
        // .setLicense(
        //     'MIT License',
        //     'https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt',
        // )
        .addServer(process.env.HOST ?? 'http://localhost:3000/')
        .setVersion(process.env.API_VERSION ?? "1.0")
        .addBearerAuth() // optional: if using JWT Auth
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/docs", app, document);


    //enable cors
    app.enableCors({
        origin: "https://gameindev.github.io", // CORRECTED: No path at the end
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
      });
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
