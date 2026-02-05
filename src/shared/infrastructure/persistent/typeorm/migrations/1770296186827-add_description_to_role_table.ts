import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDescriptionToRoleTable1770296186827 implements MigrationInterface {
    name = 'AddDescriptionToRoleTable1770296186827'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" ADD "description" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "description"`);
    }

}
