import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1720793102890 implements MigrationInterface {
  name = "Default1720793102890";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "masses_scales" ("id" BIGSERIAL NOT NULL, "code" bigint NOT NULL, "mass_id" bigint, "pastoral_id" bigint, "user_id" bigint, CONSTRAINT "PK_7022b0ba2f05c33a2464f07c88e" PRIMARY KEY ("id"))`
    );

    await queryRunner.query(
      `ALTER TABLE "masses_scales" ADD CONSTRAINT "FK_3fd300c6115c8d49ff5f8964af6" FOREIGN KEY ("mass_id") REFERENCES "masses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "masses_scales" ADD CONSTRAINT "FK_13a6b526fc10f21b7d848ef93c1" FOREIGN KEY ("pastoral_id") REFERENCES "pastorals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "masses_scales" ADD CONSTRAINT "FK_1168b10a2901610a6baa07fcafc" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "masses_scales" DROP CONSTRAINT "FK_1168b10a2901610a6baa07fcafc"`
    );
    await queryRunner.query(
      `ALTER TABLE "masses_scales" DROP CONSTRAINT "FK_13a6b526fc10f21b7d848ef93c1"`
    );
    await queryRunner.query(
      `ALTER TABLE "masses_scales" DROP CONSTRAINT "FK_3fd300c6115c8d49ff5f8964af6"`
    );

    await queryRunner.query(`DROP TABLE "masses_scales"`);
  }
}
