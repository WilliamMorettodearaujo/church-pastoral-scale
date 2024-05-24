import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1716424349153 implements MigrationInterface {
    name = 'Default1716424349153'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "federal_units" ("uf" character varying(2) NOT NULL, "name" character varying(50) NOT NULL, "ibge_code" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_3b7ea6052d740a62d8d50a79c27" PRIMARY KEY ("uf"))`);
        await queryRunner.query(`CREATE TABLE "cities" ("id" BIGSERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(100), CONSTRAINT "PK_4762ffb6e5d198cfec5606bc11e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "churchs" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "churchs" DROP COLUMN "cnpj"`);
        await queryRunner.query(`ALTER TABLE "churchs" DROP COLUMN "ie"`);
        await queryRunner.query(`ALTER TABLE "churchs" ADD "corporateName" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "churchs" ADD "tradingName" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "churchs" ADD "federalDocument" character varying(20)`);
        await queryRunner.query(`ALTER TABLE "churchs" ADD "stateDocument" character varying(20)`);
        await queryRunner.query(`ALTER TABLE "churchs" ADD "address" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "churchs" ADD "numberAddress" character varying(10)`);
        await queryRunner.query(`ALTER TABLE "churchs" ADD "complement" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "churchs" ADD "district" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "churchs" ADD "codepostal" character varying(11)`);
        await queryRunner.query(`ALTER TABLE "churchs" ADD "cityId" bigint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "churchs" ADD "phone" character varying(15)`);
        await queryRunner.query(`ALTER TABLE "churchs" ADD "cell" character varying(15)`);
        await queryRunner.query(`ALTER TABLE "churchs" ADD "email" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "churchs" ADD "home" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "churchs" ADD "observation" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "churchs" ADD "picture" character varying(80)`);
        await queryRunner.query(`ALTER TABLE "churchs" ADD "enabled" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "churchs" DROP COLUMN "enabled"`);
        await queryRunner.query(`ALTER TABLE "churchs" DROP COLUMN "picture"`);
        await queryRunner.query(`ALTER TABLE "churchs" DROP COLUMN "observation"`);
        await queryRunner.query(`ALTER TABLE "churchs" DROP COLUMN "home"`);
        await queryRunner.query(`ALTER TABLE "churchs" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "churchs" DROP COLUMN "cell"`);
        await queryRunner.query(`ALTER TABLE "churchs" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "churchs" DROP COLUMN "cityId"`);
        await queryRunner.query(`ALTER TABLE "churchs" DROP COLUMN "codepostal"`);
        await queryRunner.query(`ALTER TABLE "churchs" DROP COLUMN "district"`);
        await queryRunner.query(`ALTER TABLE "churchs" DROP COLUMN "complement"`);
        await queryRunner.query(`ALTER TABLE "churchs" DROP COLUMN "numberAddress"`);
        await queryRunner.query(`ALTER TABLE "churchs" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "churchs" DROP COLUMN "stateDocument"`);
        await queryRunner.query(`ALTER TABLE "churchs" DROP COLUMN "federalDocument"`);
        await queryRunner.query(`ALTER TABLE "churchs" DROP COLUMN "tradingName"`);
        await queryRunner.query(`ALTER TABLE "churchs" DROP COLUMN "corporateName"`);
        await queryRunner.query(`ALTER TABLE "churchs" ADD "ie" character varying(20)`);
        await queryRunner.query(`ALTER TABLE "churchs" ADD "cnpj" character varying(20)`);
        await queryRunner.query(`ALTER TABLE "churchs" ADD "name" character varying(80)`);
        await queryRunner.query(`DROP TABLE "cities"`);
        await queryRunner.query(`DROP TABLE "federal_units"`);
    }

}
