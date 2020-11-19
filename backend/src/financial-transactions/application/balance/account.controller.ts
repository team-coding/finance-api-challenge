import { Controller, Get } from '@nestjs/common';
import { AccountEntity } from '../../infra/account.entity';
import { AccountService } from './account.service';

@Controller('/api/balance')
export class AccountController {
 constructor(private accountService: AccountService) { }
 
 @Get()
 getBalance():Promise<AccountEntity[]> {
  return this.accountService.getAccount()
 }
 
}
