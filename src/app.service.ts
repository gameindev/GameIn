import { Injectable } from "@nestjs/common";

/**
 * Application service.
 */
@Injectable()
export class AppService {
    /**
     * Get hello world.
     * @returns Hello world.
     */
    getHello(): string {
        return "Hello World!";
    }
}
