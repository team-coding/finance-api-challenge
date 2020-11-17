import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';
import { TransactionModule } from './financial-transactions/application/transaction/transaction.module';
import { AccountModule } from './financial-transactions/application/balance/account.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    TransactionModule,
    AccountModule
  ]
})
export class AppModule {}
