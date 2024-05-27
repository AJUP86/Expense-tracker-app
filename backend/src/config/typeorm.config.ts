import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';

const entitiesPath = path.resolve(__dirname, '/database/entities/*{.ts,.js}');
const migrationsPath = path.resolve(
  __dirname,
  '../database/migrations/*{.ts,.js}',
);

export const getTypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: [entitiesPath],
  migrations: [migrationsPath],
  synchronize: true, // For development only
});

export const getDataSourceOptions = (
  configService: ConfigService,
): DataSourceOptions => {
  console.log(entitiesPath);
  console.log(migrationsPath);
  return {
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    entities: [entitiesPath],
    migrations: [migrationsPath],
    synchronize: true, // For development only
  };
};
