export interface DatabaseCreationServiceInterface {
    createDatabaseIfNotExists(): Promise<void>;
    runMigrations(): Promise<void>;
}
