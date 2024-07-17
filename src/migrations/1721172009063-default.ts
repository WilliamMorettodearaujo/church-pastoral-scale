import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1721172009063 implements MigrationInterface {
  name = "Default1721172009063";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "permission_resources" DROP CONSTRAINT "FK_a04129bcb3c3b3c18e6c71e630d"`
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_bcc469570df0158006c95ea1118"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_bcc469570df0158006c95ea111"`
    );
    await queryRunner.query(
      `ALTER TABLE "permission_resources" RENAME COLUMN "resource_id" TO "permission_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" RENAME COLUMN "resource_id" TO "permission_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" RENAME CONSTRAINT "PK_52290f0f645a397a8689c91ae0b" TO "PK_25d24010f53bb80b78e412c9656"`
    );

    await queryRunner.query(
      `CREATE INDEX "IDX_17022daf3f885f7d35423e9971" ON "role_permissions" ("permission_id") `
    );
    await queryRunner.query(
      `ALTER TABLE "permission_resources" ADD CONSTRAINT "FK_6464050847c8a47ee677b0c7bde" FOREIGN KEY ("permission_id") REFERENCES "permission_resources"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_17022daf3f885f7d35423e9971e" FOREIGN KEY ("permission_id") REFERENCES "resources"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_17022daf3f885f7d35423e9971e"`
    );
    await queryRunner.query(
      `ALTER TABLE "permission_resources" DROP CONSTRAINT "FK_6464050847c8a47ee677b0c7bde"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_17022daf3f885f7d35423e9971"`
    );

    await queryRunner.query(
      `ALTER TABLE "role_permissions" RENAME CONSTRAINT "PK_25d24010f53bb80b78e412c9656" TO "PK_52290f0f645a397a8689c91ae0b"`
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" RENAME COLUMN "permission_id" TO "resource_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "permission_resources" RENAME COLUMN "permission_id" TO "resource_id"`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bcc469570df0158006c95ea111" ON "role_permissions" ("resource_id") `
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_bcc469570df0158006c95ea1118" FOREIGN KEY ("resource_id") REFERENCES "resources"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "permission_resources" ADD CONSTRAINT "FK_a04129bcb3c3b3c18e6c71e630d" FOREIGN KEY ("resource_id") REFERENCES "resources"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
