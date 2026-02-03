import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserAndRoleTable1770132259506 implements MigrationInterface {
    name = 'CreateUserAndRoleTable1770132259506'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."roles_context_type_enum" AS ENUM('system', 'application', 'producer')`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "name" character varying(100) NOT NULL, "context_type" "public"."roles_context_type_enum" NOT NULL, "permissions" jsonb NOT NULL DEFAULT '{}', "context_id" uuid, "canDelete" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_roles_name_context" UNIQUE ("name", "context_id"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_roles_context" ON "roles" ("context_id") `);
        await queryRunner.query(`CREATE TABLE "user_roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "user_id" uuid NOT NULL, "role_id" uuid NOT NULL, CONSTRAINT "UQ_user_roles_user_id" UNIQUE ("user_id"), CONSTRAINT "PK_8acd5cf26ebd158416f477de799" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "created_by" character varying, "updated_by" character varying, "deleted_by" character varying, "full_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "is_staff" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_user_email" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_user_email_fullname" ON "users" ("email", "full_name") `);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_user_roles_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_user_roles_role_id" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_user_roles_role_id"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_user_roles_user_id"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_user_email_fullname"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "user_roles"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_roles_context"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TYPE "public"."roles_context_type_enum"`);
    }

}
