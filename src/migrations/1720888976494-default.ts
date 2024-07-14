import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1720888976494 implements MigrationInterface {
  name = "Default1720888976494";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "masses_scales" DROP CONSTRAINT "FK_1168b10a2901610a6baa07fcafc"`
    );
    await queryRunner.query(
      `CREATE TABLE "mass_scales_users" ("mass_scale_id" bigint NOT NULL, "user_id" bigint NOT NULL, CONSTRAINT "PK_90e9caca16a8f803ccb6a545181" PRIMARY KEY ("mass_scale_id", "user_id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4dc0be3c367a7292b96f5ef0d2" ON "mass_scales_users" ("mass_scale_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e017568545b6c630d94e3c181f" ON "mass_scales_users" ("user_id") `
    );
    await queryRunner.query(
      `ALTER TABLE "masses_scales" DROP COLUMN "user_id"`
    );

    await queryRunner.query(
      `ALTER TABLE "mass_scales_users" ADD CONSTRAINT "FK_4dc0be3c367a7292b96f5ef0d2d" FOREIGN KEY ("mass_scale_id") REFERENCES "masses_scales"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "mass_scales_users" ADD CONSTRAINT "FK_e017568545b6c630d94e3c181fb" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "mass_scales_users" DROP CONSTRAINT "FK_e017568545b6c630d94e3c181fb"`
    );
    await queryRunner.query(
      `ALTER TABLE "mass_scales_users" DROP CONSTRAINT "FK_4dc0be3c367a7292b96f5ef0d2d"`
    );

    await queryRunner.query(`ALTER TABLE "masses_scales" ADD "user_id" bigint`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e017568545b6c630d94e3c181f"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4dc0be3c367a7292b96f5ef0d2"`
    );
    await queryRunner.query(`DROP TABLE "mass_scales_users"`);
    await queryRunner.query(
      `ALTER TABLE "masses_scales" ADD CONSTRAINT "FK_1168b10a2901610a6baa07fcafc" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
