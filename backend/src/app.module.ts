// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BudgetModule } from './budget/budget.module';
import { CategoryModule } from './category/category.module';
import { ExpenseModule } from './expenses/expense.module';
import { NotificationService } from './notification/notification.service';
import { NotificationModule } from './notification/notification.module';
import { getTypeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load .env file
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        getTypeOrmConfig(configService),
      inject: [ConfigService],
    }),
    DatabaseModule,
    UserModule,
    BudgetModule,
    CategoryModule,
    ExpenseModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService, NotificationService],
})
export class AppModule {}
