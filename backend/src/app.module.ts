import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';
import { TransactionModule } from './financial-transactions/application/transaction.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    TransactionModule
  ]
})
export class AppModule {}
