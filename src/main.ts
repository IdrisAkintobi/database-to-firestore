import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { WinstonModule } from 'nest-winston';
import { AppModule } from './app.module';
// import { UserCollectionRunnerService } from './application/user.collection.runner.service';
import { Logger } from './infrastructure/utils/logger';

// const port = process.env.PORT || 3000;

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule, {
        logger: WinstonModule.createLogger(new Logger().getLoggerConfig(process.env.NODE_ENV)),
    });
    app.enableShutdownHooks();
    // const collectionRunner = app.get(UserCollectionRunnerService);
    // await collectionRunner.updateUserCollection();
    // await app.listen(port);

    // console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
