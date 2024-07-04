import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1720027676128 implements MigrationInterface {
    name = 'Default1720027676128'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pastorals" DROP CONSTRAINT "FK_e080d8b2c275f4cd19c12700f7a"`);
        await queryRunner.query(`ALTER TABLE "pastorals" RENAME COLUMN "churchId" TO "church_id"`);
        await queryRunner.query(`ALTER TABLE "pastorals" ADD CONSTRAINT "FK_8964aa963bd2576fa8a88f16caa" FOREIGN KEY ("church_id") REFERENCES "churchs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pastorals" DROP CONSTRAINT "FK_8964aa963bd2576fa8a88f16caa"`);
        await queryRunner.query(`ALTER TABLE "pastorals" RENAME COLUMN "church_id" TO "churchId"`);
        await queryRunner.query(`ALTER TABLE "pastorals" ADD CONSTRAINT "FK_e080d8b2c275f4cd19c12700f7a" FOREIGN KEY ("churchId") REFERENCES "churchs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
