import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateTransactionDto } from "../dto/create-transaction.dto";
import { Transaction, TransactionDocument } from '../infra/transaction.schema';

@Injectable()
export class  TrasnsactionService {
 constructor(@InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>) { }
 
 async findAllTransactions(dto: any): Promise<Transaction[]>{
  const transactions = this.transactionModel.find({});
  return transactions;
 }

 async createTransaction(dto: CreateTransactionDto): Promise<Transaction>{
  return (await this.transactionModel.create(dto)).save();
 }

}