import { EntityRepository, Repository } from "typeorm";
import { AccountEntity } from "./account.entity";

@EntityRepository(AccountEntity)
export class AccountRepository extends Repository<AccountEntity>{
 async getAccount():Promise<AccountEntity[]> {
  return await this.find()
 }
}