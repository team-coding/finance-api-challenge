import { AccountEntity } from '../../infra/account.entity';
import { AccountService } from './account.service';
export declare class AccountController {
    private accountService;
    constructor(accountService: AccountService);
    getBalance(): Promise<AccountEntity[]>;
}
