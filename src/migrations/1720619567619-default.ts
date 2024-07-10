import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1720619567619 implements MigrationInterface {
  name = "Default1720619567619";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "pastorals_users" ("pastoralsId" bigint NOT NULL, "usersId" bigint NOT NULL, CONSTRAINT "PK_83444c75fbe24dfdcac4f08833f" PRIMARY KEY ("pastoralsId", "usersId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8e82e855b397158cabf860fc9e" ON "pastorals_users" ("pastoralsId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_dd882b2fb5e80a344b1e1fe750" ON "pastorals_users" ("usersId") `
    );

    await queryRunner.query(
      `ALTER TABLE "pastorals_users" ADD CONSTRAINT "FK_8e82e855b397158cabf860fc9e4" FOREIGN KEY ("pastoralsId") REFERENCES "pastorals"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "pastorals_users" ADD CONSTRAINT "FK_dd882b2fb5e80a344b1e1fe750e" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pastorals_users" DROP CONSTRAINT "FK_dd882b2fb5e80a344b1e1fe750e"`
    );
    await queryRunner.query(
      `ALTER TABLE "pastorals_users" DROP CONSTRAINT "FK_8e82e855b397158cabf860fc9e4"`
    );

    await queryRunner.query(
      `DROP INDEX "public"."IDX_dd882b2fb5e80a344b1e1fe750"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8e82e855b397158cabf860fc9e"`
    );
    await queryRunner.query(`DROP TABLE "pastorals_users"`);
  }
}
