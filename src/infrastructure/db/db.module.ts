import { Module } from '@nestjs/common';
import { FirebaseAdminRepository } from './repository/firebase-admin';

@Module({
    providers: [FirebaseAdminRepository],
    exports: [FirebaseAdminRepository],
})
export class DbModule {}
