import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1721161084536 implements MigrationInterface {
  name = "Default1721161084536";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" BIGSERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "code" bigint NOT NULL, "name" character varying(100), "description" character varying(255), "enabled" boolean NOT NULL DEFAULT true, "church_id" bigint, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`
    );

    await queryRunner.query(
      `ALTER TABLE "roles" ADD CONSTRAINT "FK_dfdfe98d3a41874c7e990bd8803" FOREIGN KEY ("church_id") REFERENCES "churchs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "roles" DROP CONSTRAINT "FK_dfdfe98d3a41874c7e990bd8803"`
    );

    await queryRunner.query(`DROP TABLE "roles"`);
  }
}
