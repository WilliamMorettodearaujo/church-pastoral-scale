import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1720138237077 implements MigrationInterface {
    name = 'Default1720138237077'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "masses" ALTER COLUMN "start_date_time" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "masses" ALTER COLUMN "start_date_time" DROP NOT NULL`);
    }

}
