import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { migrationUser1676963411858 } from './migrations/1676963411858-migrationUser';
import { migrationInvoice1676967813266 } from './migrations/1676967813266-migrationInvoice';
import { migrationPayment1676967819019 } from './migrations/1676967819019-migrationPayment';
import User from './users/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'stripe',
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [
    migrationUser1676963411858,
    migrationInvoice1676967813266,
    migrationPayment1676967819019,
  ],
  subscribers: [],
});
