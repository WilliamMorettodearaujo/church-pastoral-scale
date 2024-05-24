import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1716424840273 implements MigrationInterface {
    name = 'Default1716424840273'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "churchs" ADD "city_id" bigint`);
        await queryRunner.query(`ALTER TABLE "churchs" ALTER COLUMN "cityId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "churchs" ALTER COLUMN "cityId" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "churchs" ADD CONSTRAINT "FK_59ccadea5f2d1971b060cd63653" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "churchs" DROP CONSTRAINT "FK_59ccadea5f2d1971b060cd63653"`);
        await queryRunner.query(`ALTER TABLE "churchs" ALTER COLUMN "cityId" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "churchs" ALTER COLUMN "cityId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "churchs" DROP COLUMN "city_id"`);
    }

}
