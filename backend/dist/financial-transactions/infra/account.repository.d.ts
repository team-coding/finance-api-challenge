import { Repository } from "typeorm";
import { AccountEntity } from "./account.entity";
export declare class AccountRepository extends Repository<AccountEntity> {
    getAccount(): Promise<AccountEntity[]>;
}
