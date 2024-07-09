import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1720553194231 implements MigrationInterface {
  name = "Default1720553194231";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "password" character varying(255)`
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "password_reset_token"`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "password_reset_token" character varying(255)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "password_reset_token"`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "password_reset_token" character varying(100)`
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "password" character varying(100)`
    );
  }
}
