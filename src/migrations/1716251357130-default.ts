import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1716251357130 implements MigrationInterface {
    name = 'Default1716251357130'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "churchs" ("id" BIGSERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(80), "cnpj" character varying(20), "ie" character varying(20), CONSTRAINT "PK_7f1f8faa5c05a00234ff6499c07" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "churchs"`);
    }

}
