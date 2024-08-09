import { MigrationInterface, QueryRunner } from 'typeorm';

export class Bootstrap1698700172805 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (
            \`user_id\` VARCHAR(64) NOT NULL DEFAULT (UUID()),
            \`email\` VARCHAR(40),
            \`first_name\` VARCHAR(15),
            \`last_name\` VARCHAR(15),
            \`full_name\` VARCHAR(32),
            \`phone_number\` VARCHAR(16),
            \`created_on\` BIGINT,
            \`active_plan\` VARCHAR(32),
            \`active_plan_id\` VARCHAR(32),
            \`subscription\` VARCHAR(32),
            \`recent_subscription_date\` BIGINT,
            \`recent_subscription_expires\` BIGINT,
            \`country_code\` VARCHAR(32),
            \`country_date\` VARCHAR(32),
            \`network\` VARCHAR(16),
            \`nunchee_id\` VARCHAR(32),
            \`paid_user\` BOOLEAN,
            \`provider\` VARCHAR(32),
            \`provider_id\` VARCHAR(32),
            \`provider_sub\` VARCHAR(32),
            \`billing_account\` JSON,
            \`external_provider_uid\` VARCHAR(32),
            \`token_id\` VARCHAR(32),
            \`agent_code\` VARCHAR(32),
            \`referrer\` VARCHAR(32),
            \`alt_phone\` VARCHAR(16),
            \`used_vouchers\` JSON,
            PRIMARY KEY (\`user_id\`)
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
    }
}
