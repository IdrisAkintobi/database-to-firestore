import { Inject, Module, OnApplicationBootstrap } from '@nestjs/common';
import { default as admin, credential } from 'firebase-admin';
import { ConfigService } from './config/config.service';
import { DbModule } from './db/db.module';

@Module({
    imports: [DbModule],
    providers: [ConfigService],
    exports: [DbModule],
})
export class InfrastructureModule implements OnApplicationBootstrap {
    constructor(@Inject(ConfigService) private readonly configService: ConfigService) {}

    async onApplicationBootstrap(): Promise<void> {
        const firebaseConfig = this.configService.getFirebaseConfig();
        const serviceAccount = this.configService.getGCloudServiceAccount();

        admin.initializeApp({
            credential: credential.cert(serviceAccount),
            databaseURL: firebaseConfig.databaseURL,
        });
    }
}
