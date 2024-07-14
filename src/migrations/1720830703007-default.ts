import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1720830703007 implements MigrationInterface {
  name = "Default1720830703007";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "masses_scales" DROP COLUMN "code"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "masses_scales" ADD "code" bigint NOT NULL`
    );
  }
}
