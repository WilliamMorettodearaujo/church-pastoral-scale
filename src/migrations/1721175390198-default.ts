import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1721175390198 implements MigrationInterface {
  name = "Default1721175390198";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "permission_resources" DROP CONSTRAINT "FK_6464050847c8a47ee677b0c7bde"`
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_17022daf3f885f7d35423e9971e"`
    );
    await queryRunner.query(
      `ALTER TABLE "permission_resources" DROP COLUMN "permission_id"`
    );

    await queryRunner.query(
      `ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_17022daf3f885f7d35423e9971e" FOREIGN KEY ("permission_id") REFERENCES "permission_resources"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_17022daf3f885f7d35423e9971e"`
    );

    await queryRunner.query(
      `ALTER TABLE "permission_resources" ADD "permission_id" bigint`
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_17022daf3f885f7d35423e9971e" FOREIGN KEY ("permission_id") REFERENCES "resources"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "permission_resources" ADD CONSTRAINT "FK_6464050847c8a47ee677b0c7bde" FOREIGN KEY ("permission_id") REFERENCES "permission_resources"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
