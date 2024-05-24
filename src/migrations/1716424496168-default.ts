import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1716424496168 implements MigrationInterface {
    name = 'Default1716424496168'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "federal_units" DROP COLUMN "ibge_code"`);
        await queryRunner.query(`ALTER TABLE "cities" ADD "uf" character varying(2)`);
        await queryRunner.query(`ALTER TABLE "cities" ADD CONSTRAINT "FK_ae747cc485765531431242a656a" FOREIGN KEY ("uf") REFERENCES "federal_units"("uf") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cities" DROP CONSTRAINT "FK_ae747cc485765531431242a656a"`);
        await queryRunner.query(`ALTER TABLE "cities" DROP COLUMN "uf"`);
        await queryRunner.query(`ALTER TABLE "federal_units" ADD "ibge_code" integer NOT NULL DEFAULT '0'`);
    }

}
