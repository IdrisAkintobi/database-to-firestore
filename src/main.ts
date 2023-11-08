import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { WinstonModule } from 'nest-winston';
import { AppModule } from './app.module';
import { Logger } from './infrastructure/utils/logger';

const port = process.env.PORT || 3000;

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: WinstonModule.createLogger(new Logger().getLoggerConfig(process.env.NODE_ENV)),
    });
    await app.listen(port);

    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
