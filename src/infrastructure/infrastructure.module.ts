import { Inject, Module, OnApplicationBootstrap } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { credential, default as admin } from 'firebase-admin';
import { FirebaseDbModule } from './db/firebase/firebase.db.module';
import { UsersFirestoreRepository } from './db/firebase/repository/user.firestore.repository';
import { DatabaseModule } from './db/mysql/database.module';
import { SubscriptionsEntity } from './db/mysql/entities/subscription.entity';
import { UserEntity } from './db/mysql/entities/user.entity';
import { SubscriptionRepository } from './db/mysql/repositories/subscription-repository';
import { UserRepository } from './db/mysql/repositories/user-repository';
import { ConfigurationService } from './utils/config.service';
import { UtilModule } from './utils/util.module';

@Module({
    imports: [
        FirebaseDbModule,
        DatabaseModule,
        UtilModule,
        TypeOrmModule.forFeature([UserEntity, SubscriptionsEntity]),
    ],
    providers: [
        { provide: 'UserRepository', useClass: UserRepository },
        { provide: 'SubscriptionRepository', useClass: SubscriptionRepository },
        UsersFirestoreRepository,
    ],
    exports: [
        UtilModule,
        FirebaseDbModule,
        'UserRepository',
        'SubscriptionRepository',
        UsersFirestoreRepository,
    ],
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
