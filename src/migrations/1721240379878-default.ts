import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1721240379878 implements MigrationInterface {
  name = "Default1721240379878";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_17022daf3f885f7d35423e9971e"`
    );
    await queryRunner.query(
      `CREATE TABLE "permissions" ("id" BIGSERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying(100), "description" character varying(255), "enabled" boolean NOT NULL DEFAULT true, "resource_id" bigint, CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`
    );

    await queryRunner.query(
      `ALTER TABLE "permissions" ADD CONSTRAINT "FK_a5b7bf2f14f8df49fc610e9a8be" FOREIGN KEY ("resource_id") REFERENCES "resources"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_17022daf3f885f7d35423e9971e" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_17022daf3f885f7d35423e9971e"`
    );
    await queryRunner.query(
      `ALTER TABLE "permissions" DROP CONSTRAINT "FK_a5b7bf2f14f8df49fc610e9a8be"`
    );

    await queryRunner.query(`DROP TABLE "permissions"`);
    await queryRunner.query(
      `ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_17022daf3f885f7d35423e9971e" FOREIGN KEY ("permission_id") REFERENCES "permission_resources"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
