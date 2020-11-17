import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getCustomRepository } from 'typeorm';
import { AccountEntity } from '../../infra/account.entity';
import { AccountRepository } from '../../infra/account.repository';
import { TransactionEntity } from '../../infra/transaction.entity';

@Injectable()
export class AccountService {
 constructor(@InjectRepository(AccountRepository) private repo: AccountRepository) { }
 
 async getAccount():Promise<AccountEntity[]> {
  return await this.repo.getAccount()
 }
 
 async saveTransactionEvent(transaction: TransactionEntity): Promise<void> {
  const repository = getCustomRepository(AccountRepository);
  let foundAccount:AccountEntity[] = await repository.getAccount()
  
  console.log("CHAMOU O EVENTO NO SERVICE")
  console.log(foundAccount)
  console.log('RECEBEU UMA TRANSAÇÃO')
  console.log(transaction)
  
  if (foundAccount.length === 0) {
   foundAccount[0] = this.repo.create();
  }
  
  if (transaction.type === '-') {
   foundAccount[0].releases = 1 + foundAccount[0].releases;
   foundAccount[0].outgoing = transaction.value + foundAccount[0].outgoing;
   foundAccount[0].balance = foundAccount[0].balance - transaction.value;
  } else {
   foundAccount[0].releases = 1 + foundAccount[0].releases;
   foundAccount[0].income = transaction.value + foundAccount[0].income ;
   foundAccount[0].balance += transaction.value + foundAccount[0].balance;
  }
  
  await foundAccount[0].save();
 }
 
 async deleteTransactionEvent(transaction: TransactionEntity):Promise<void> {
  const repository = getCustomRepository(AccountRepository);
  const account = await repository.getAccount();
  
  let foundAccount = account[0];
  if (!foundAccount) {
   return;
  }
  if (transaction.type === '-') {
   foundAccount.releases -= 1;
   foundAccount.outgoing -= transaction.value;
   foundAccount.balance += transaction.value;
  } else {
   foundAccount.releases -= 1;
   foundAccount.income -= transaction.value;
   foundAccount.balance -= transaction.value;
  }
 }

 public static async afterDeleteEvent(transaction:TransactionEntity):Promise<void> {
  await this.prototype.deleteTransactionEvent(transaction)
 }

 public static async afterSaveEvent(transaction:TransactionEntity):Promise<void> {
  await this.prototype.saveTransactionEvent(transaction)
 }
}
