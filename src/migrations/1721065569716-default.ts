import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1721065569716 implements MigrationInterface {
  name = "Default1721065569716";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "permission_resources" ("id" BIGSERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(100), "description" character varying(255), "enabled" boolean NOT NULL DEFAULT true, "church_id" bigint, CONSTRAINT "PK_bd9a852794ac5359ce685607ca2" PRIMARY KEY ("id"))`
    );

    await queryRunner.query(
      `ALTER TABLE "permission_resources" ADD CONSTRAINT "FK_f5071b6d8eeac3d7d114874f6c4" FOREIGN KEY ("church_id") REFERENCES "resources"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "permission_resources" DROP CONSTRAINT "FK_f5071b6d8eeac3d7d114874f6c4"`
    );

    await queryRunner.query(`DROP TABLE "permission_resources"`);
  }
}
