// src/database.test.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  try {
    const dataSource = app.get(DataSource);
    if (dataSource.isInitialized) {
      console.log('Database connection is established successfully.');
    } else {
      console.log('Failed to connect to the database.');
    }
  } catch (error) {
    console.error('Error during database connection:', error);
  } finally {
    await app.close();
  }
}

bootstrap();
