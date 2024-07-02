import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1718701831377 implements MigrationInterface {
    name = 'Default1718701831377'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "federal_units" ADD "enabled" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "cities" ADD "enabled" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cities" DROP COLUMN "enabled"`);
        await queryRunner.query(`ALTER TABLE "federal_units" DROP COLUMN "enabled"`);
    }

}
