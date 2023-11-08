import { Inject, Module, OnApplicationBootstrap } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { default as admin, credential } from 'firebase-admin';
import { FirebaseDbModule } from './db/firebase/firebase.db.module';
import { DatabaseCreationServiceInterface } from './db/postgres/database-creation-service.interface';
import { DatabaseCreationModule } from './db/postgres/database-creation.module';
import { DatabaseModule } from './db/postgres/database.module';
import { UserEntity } from './db/postgres/entities/user.entity';
import { UserRepository } from './db/postgres/repositories/user-repository';
import { ConfigurationService } from './utils/config.service';
import { UtilModule } from './utils/util.module';

@Module({
    imports: [
        FirebaseDbModule,
        DatabaseModule,
        DatabaseCreationModule,
        UtilModule,
        TypeOrmModule.forFeature([UserEntity]),
    ],
    providers: [{ provide: 'UserRepository', useClass: UserRepository }],
    exports: [UtilModule, FirebaseDbModule, 'UserRepository'],
})
export class InfrastructureModule implements OnApplicationBootstrap {
    constructor(
        @Inject('ConfigurationService') private readonly configService: ConfigurationService,
        @Inject('DatabaseCreationServiceInterface')
        private readonly databaseCreationService: DatabaseCreationServiceInterface,
    ) {}

    async onApplicationBootstrap(): Promise<void> {
        const firebaseConfig = this.configService.getFirebaseConfig();
        const serviceAccount = this.configService.getGCloudServiceAccount();

        admin.initializeApp({
            credential: credential.cert(serviceAccount),
            databaseURL: firebaseConfig.databaseURL,
        });

        await this.databaseCreationService.createDatabaseIfNotExists();
        await this.databaseCreationService.runMigrations();
    }
}
