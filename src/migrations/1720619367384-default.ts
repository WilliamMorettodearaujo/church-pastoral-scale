import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1720619367384 implements MigrationInterface {
  name = "Default1720619367384";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "pastorals_pastorals_users" ("pastoralsId" bigint NOT NULL, "usersId" bigint NOT NULL, CONSTRAINT "PK_e745317ec2b00b1178628dcfc2e" PRIMARY KEY ("pastoralsId", "usersId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_20308ef9409e027dcd1544a1cf" ON "pastorals_pastorals_users" ("pastoralsId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5c24f309458a7fd14012a0c893" ON "pastorals_pastorals_users" ("usersId") `
    );

    await queryRunner.query(
      `ALTER TABLE "pastorals_pastorals_users" ADD CONSTRAINT "FK_20308ef9409e027dcd1544a1cfd" FOREIGN KEY ("pastoralsId") REFERENCES "pastorals"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "pastorals_pastorals_users" ADD CONSTRAINT "FK_5c24f309458a7fd14012a0c8939" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pastorals_pastorals_users" DROP CONSTRAINT "FK_5c24f309458a7fd14012a0c8939"`
    );
    await queryRunner.query(
      `ALTER TABLE "pastorals_pastorals_users" DROP CONSTRAINT "FK_20308ef9409e027dcd1544a1cfd"`
    );

    await queryRunner.query(
      `DROP INDEX "public"."IDX_5c24f309458a7fd14012a0c893"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_20308ef9409e027dcd1544a1cf"`
    );
    await queryRunner.query(`DROP TABLE "pastorals_pastorals_users"`);
  }
}
