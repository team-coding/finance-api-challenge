import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionRepository } from '../../../financial-transactions/infra/transaction.repository';
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
  
  if (foundAccount.length === 0) {
   foundAccount[0] = this.repo.create();
  }
  const account = foundAccount[0];
  if (transaction.type === '-') {
   account.releases += 1;
   account.outgoing += transaction.value;
   account.balance -= transaction.value;
  } else {
   account.releases += 1;
   account.income += transaction.value;
   account.balance += transaction.value;
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
 
 async updateTransactionEvent(newTransaction: TransactionEntity): Promise<void>{
  try {
   const repository = getCustomRepository(AccountRepository);
   const accounts = await repository.getAccount();
   const account = accounts[0];
   const transactionRepo = getCustomRepository(TransactionRepository);
   const oldTransaction = await transactionRepo.findOne(newTransaction.id);
   
   if (!oldTransaction || !account) {
    return;
   }
   
   // Update on transaction 
   if (newTransaction.type !== oldTransaction.type || newTransaction.value !== oldTransaction.value) {
    // Case user update only type from - to +
    if (newTransaction.type === '+' && newTransaction.type !== oldTransaction.type && newTransaction.value === oldTransaction.value) {
     account.outgoing -= newTransaction.value;
     account.income += newTransaction.value;
     account.balance += newTransaction.value;
     await account.save();
     return;
     // Case user update only type from + to -
    } else if (newTransaction.type === '-' && newTransaction.type !== oldTransaction.type && newTransaction.value === oldTransaction.value) {
     account.outgoing += newTransaction.value;
     account.income -= newTransaction.value;
     account.balance -= newTransaction.value;
     await account.save();
     return;
     // Case user update only value
    } else if (newTransaction.type === oldTransaction.type && newTransaction.value !== oldTransaction.value && newTransaction.type === '+') {
     
     const isAdding = newTransaction.value > oldTransaction.value;
     // Case user is adding more money
     if (isAdding) {
      const difference = (newTransaction.value - oldTransaction.value);
      account.income += difference;
      account.balance += difference;
      await account.save();
      return;
     }
     // Case user is removing money
     const difference = (oldTransaction.value - newTransaction.value);
     account.income -= difference;
     account.balance += difference;
     await account.save();
     return;
     
    } else if (newTransaction.type === oldTransaction.type && newTransaction.value !== oldTransaction.value && newTransaction.type === '-') {
     //User is changing a negative transaction 
     const isAdding = newTransaction.value > oldTransaction.value;
     // Case user is adding more money
     if (isAdding) {
      const difference = (newTransaction.value - oldTransaction.value);
      account.outgoing += difference;
      account.balance -= difference;
      await account.save();
      return;
     }
     // Case user is removing money
     const difference = (oldTransaction.value - newTransaction.value);
     account.outgoing -= difference;
     account.balance += difference;
     await account.save();
     return;
     
    }else if (newTransaction.type !== oldTransaction.type && newTransaction.value !== oldTransaction.value && newTransaction.type === '-') {
    
     account.outgoing += newTransaction.value;
     account.income -= oldTransaction.value;
     account.balance -= oldTransaction.value;
     account.balance += newTransaction.value;
     await account.save();
     return;
     
    } else if (newTransaction.type !== oldTransaction.type && newTransaction.value !== oldTransaction.value && newTransaction.type === '+') {
 
     account.outgoing -= oldTransaction.value;
     account.income += newTransaction.value;
     account.balance -= oldTransaction.value;
     account.balance += newTransaction.value;
     await account.save();
     return;
 
    }
   } 
  } catch (error) {
   console.log(error);
  }
  
 }
 
 public static async afterDeleteEvent(transaction:TransactionEntity):Promise<void> {
  await this.prototype.deleteTransactionEvent(transaction)
 }
 
 public static async afterSaveEvent(transaction:TransactionEntity):Promise<void> {
  await this.prototype.saveTransactionEvent(transaction)
 }
 
 public static async beforeupdateEvent(transaction:TransactionEntity):Promise<void> {
  await this.prototype.updateTransactionEvent(transaction)
 }
}
