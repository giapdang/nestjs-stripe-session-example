import { MigrationInterface, QueryRunner, TableIndex } from 'typeorm';

export class AddIndexToStripeCustomerId1677808653194
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createIndex(
      'user',
      new TableIndex({
        name: 'IDX_USER_STRIPE_CUSTOMER_ID',
        columnNames: ['stripe_customer_id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('user', 'IDX_USER_STRIPE_CUSTOMER_ID');
  }
}
