import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { getDataSourceOptions } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot(); // Load .env file

const configService = new ConfigService();

export const AppDataSource = new DataSource(
  getDataSourceOptions(configService),
);

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
