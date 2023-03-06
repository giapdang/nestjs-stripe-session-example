import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addPhoneNumberToUser1678072392268 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'phone_number',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'phone_number');
  }
}
