import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateTransactionDto } from "../dto/create-transaction.dto";
import { TransactionRepository } from "../infra/transaction.repository";
import { TransactionEntity } from "../infra/transaction.entity";


@Injectable()
export class  TrasnsactionService {
 constructor(@InjectRepository(TransactionRepository) private repo: TransactionRepository) { }
 
 async findAllTransactions(dto: any): Promise<TransactionEntity[]>{
  const transactions = this.repo.find({});
  return transactions;
 }

 async createTransaction(dto: CreateTransactionDto): Promise<TransactionEntity>{
  return (await this.repo.create(dto)).save();
 }

}