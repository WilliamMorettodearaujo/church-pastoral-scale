import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1721171834281 implements MigrationInterface {
  name = "Default1721171834281";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "role_permissions" ("role_id" bigint NOT NULL, "resource_id" bigint NOT NULL, CONSTRAINT "PK_52290f0f645a397a8689c91ae0b" PRIMARY KEY ("role_id", "resource_id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_178199805b901ccd220ab7740e" ON "role_permissions" ("role_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bcc469570df0158006c95ea111" ON "role_permissions" ("resource_id") `
    );

    await queryRunner.query(
      `ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_178199805b901ccd220ab7740ec" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_bcc469570df0158006c95ea1118" FOREIGN KEY ("resource_id") REFERENCES "resources"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_bcc469570df0158006c95ea1118"`
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_178199805b901ccd220ab7740ec"`
    );

    await queryRunner.query(
      `DROP INDEX "public"."IDX_bcc469570df0158006c95ea111"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_178199805b901ccd220ab7740e"`
    );
    await queryRunner.query(`DROP TABLE "role_permissions"`);
  }
}
