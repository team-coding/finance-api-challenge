import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountRepository } from '../../infra/account.repository';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
 imports: [TypeOrmModule.forFeature([AccountRepository])],
 controllers: [AccountController],
 providers:[AccountService]
})
export class AccountModule{}
