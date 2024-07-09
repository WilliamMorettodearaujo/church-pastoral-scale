import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1720532198071 implements MigrationInterface {
  name = "Default1720532198071";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" BIGSERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "code" bigint NOT NULL, "name" character varying(100), "email" character varying(255) NOT NULL, "password" character varying(100), "password_reset_token" character varying(100), "enabled" boolean NOT NULL DEFAULT true, "church_id" bigint, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );

    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_44724eb5230e0e127a7843f72a4" FOREIGN KEY ("church_id") REFERENCES "churchs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_44724eb5230e0e127a7843f72a4"`
    );

    await queryRunner.query(`DROP TABLE "users"`);
  }
}
