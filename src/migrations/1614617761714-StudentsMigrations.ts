import { MigrationInterface, QueryRunner } from 'typeorm';

export class StudentsMigrations1614617761714 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TYPE rating AS ENUM ( 'poor', 'pair', 'good', 'excellent' );

        CREATE TABLE "student" (
          id SERIAL NOT NULL PRIMARY KEY,
          surname character varying NOT NULL,
          name character varying NOT NULL,
          patronymic character varying,
          birthday date NOT NULL,
          rating rating NOT NULL,
          created_at timestamp NOT NULL DEFAULT now(),
          updated_at timestamp NOT NULL DEFAULT now()
      )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "student"`);
  }
}
