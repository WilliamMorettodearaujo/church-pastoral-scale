import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1720054530183 implements MigrationInterface {
    name = 'Default1720054530183'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pastorals" ADD "code" bigint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pastorals" DROP COLUMN "code"`);
    }

}
