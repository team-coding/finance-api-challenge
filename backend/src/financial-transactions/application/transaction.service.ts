import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateTransactionDto } from "../dto/create-transaction.dto";
import { TransactionRepository } from "../infra/transaction.repository";
import { TransactionEntity } from "../infra/transaction.entity";
import { UpdateTransactionDto } from "../dto/update-transaction.dto";


@Injectable()
export class TrasnsactionService {
 constructor(@InjectRepository(TransactionRepository) private repo: TransactionRepository) { }

 async findTransactionById(id: string): Promise<TransactionEntity> {
  return await this.repo.findOneOrFail(id);
 }
 
 async findAllTransactions(dto: any): Promise<TransactionEntity[]> {
  const transactions = this.repo.find({});
  return transactions;
 }
 
 async createTransaction(dto: CreateTransactionDto): Promise<TransactionEntity> {
  return (this.repo.create(dto)).save();
 }
 
 async updateTransaction(dto: UpdateTransactionDto, id: string): Promise<TransactionEntity> {
  return await this.repo.updateTransaction(dto, id);
 }
 
 async deleteOneTransactionById(id: string): Promise<TransactionEntity> { 
  const foundOrFail = await this.findTransactionById(id)
  return await foundOrFail.remove();
 }
 
}