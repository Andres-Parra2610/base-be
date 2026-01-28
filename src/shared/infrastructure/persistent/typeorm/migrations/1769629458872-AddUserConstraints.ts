import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserConstraints1769629458872 implements MigrationInterface {
  name = 'AddUserConstraints1769629458872';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_user_email" UNIQUE ("email")`);
    await queryRunner.query(
      `CREATE INDEX "IDX_user_email_fullname" ON "users" ("email", "full_name") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_user_email_fullname"`);
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_user_email"`);
  }
}
