import { MigrationInterface, QueryRunner } from 'typeorm';

export class Bootstrap1698700172805 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.query(`CREATE TABLE "user" (
            "user_id" character varying(64) NOT NULL DEFAULT uuid_generate_v4(),
            "email" character varying(40),
            "first_name" character varying(15),
            "last_name" character varying(15),
            "full_name" character varying(32),
            "phone_number" character varying(16),
            "created_on" bigint,
            "active_plan" character varying(32),
            "active_plan_id" character varying(32),
            "subscription" character varying(32),
            "recent_subscription_date" bigint,
            "recent_subscription_expires" bigint,
            "country_code" character varying,
            "country_date" character varying(32),
            "network" character varying(16),
            "nunchee_id" character varying(32),
            "paid_user" boolean,
            "provider" character varying(32),
            "provider_id" character varying(32),
            "provider_sub" character varying(32),
            "billing_account" jsonb,
            "external_provider_uid" character varying(32),
            "token_id" character varying(32),
            "agent_code" character varying(32),
            "referrer" character varying(32),
            "alt_phone" character varying(16),
            "used_vouchers" jsonb,
            CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("user_id")
            )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
