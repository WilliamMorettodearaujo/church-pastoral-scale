import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1721065650865 implements MigrationInterface {
  name = "Default1721065650865";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "permission_resources" DROP CONSTRAINT "FK_f5071b6d8eeac3d7d114874f6c4"`
    );
    await queryRunner.query(
      `ALTER TABLE "permission_resources" RENAME COLUMN "church_id" TO "resource_id"`
    );

    await queryRunner.query(
      `ALTER TABLE "permission_resources" ADD CONSTRAINT "FK_a04129bcb3c3b3c18e6c71e630d" FOREIGN KEY ("resource_id") REFERENCES "resources"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "permission_resources" DROP CONSTRAINT "FK_a04129bcb3c3b3c18e6c71e630d"`
    );

    await queryRunner.query(
      `ALTER TABLE "permission_resources" RENAME COLUMN "resource_id" TO "church_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "permission_resources" ADD CONSTRAINT "FK_f5071b6d8eeac3d7d114874f6c4" FOREIGN KEY ("church_id") REFERENCES "resources"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
