import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1720134902665 implements MigrationInterface {
    name = 'Default1720134902665'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "masses" ("id" BIGSERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "code" bigint NOT NULL, "name" character varying(100), "observation" character varying(255), "start_date_time" TIMESTAMP, "enabled" boolean NOT NULL DEFAULT true, "church_id" bigint, CONSTRAINT "PK_0f604b5b7f88db1e4b6c6c5ff67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "masses" ADD CONSTRAINT "FK_5ecd27352652b5742586a028905" FOREIGN KEY ("church_id") REFERENCES "churchs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "masses" DROP CONSTRAINT "FK_5ecd27352652b5742586a028905"`);
        await queryRunner.query(`DROP TABLE "masses"`);
    }

}
