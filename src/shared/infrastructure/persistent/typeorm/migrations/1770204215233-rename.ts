import { MigrationInterface, QueryRunner } from "typeorm";

export class Rename1770204215233 implements MigrationInterface {
    name = 'Rename1770204215233'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" RENAME COLUMN "canDelete" TO "can_delete"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" RENAME COLUMN "can_delete" TO "canDelete"`);
    }

}
