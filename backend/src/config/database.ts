import { DataSource } from 'typeorm';
import { Item } from '../entities/Item.js';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DB_PATH || './database.sqlite',
  synchronize: true, // Auto-create tables (disable in production)
  logging: process.env.NODE_ENV === 'development',
  entities: [Item],
  migrations: [],
  subscribers: [],
});
