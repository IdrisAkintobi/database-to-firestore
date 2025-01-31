import { Inject, Module, OnApplicationBootstrap } from '@nestjs/common';
import { credential, default as admin } from 'firebase-admin';
import { FirebaseDbModule } from './db/firebase/firebase.db.module';
import { UsersFirestoreRepository } from './db/firebase/repository/user.firestore.repository';
import { ConfigurationService } from './utils/config.service';
import { UtilModule } from './utils/util.module';

@Module({
    imports: [FirebaseDbModule, UtilModule],
    providers: [UsersFirestoreRepository],
    exports: [UtilModule, FirebaseDbModule, UsersFirestoreRepository],
})
export class InfrastructureModule implements OnApplicationBootstrap {
    constructor(
        @Inject('ConfigurationService') private readonly configService: ConfigurationService,
    ) {}

    async onApplicationBootstrap(): Promise<void> {
        const firebaseConfig = this.configService.getFirebaseConfig();
        const serviceAccount = this.configService.getGCloudServiceAccount();

        admin.initializeApp({
            credential: credential.cert(serviceAccount),
            databaseURL: firebaseConfig.databaseURL,
        });
    }
}
