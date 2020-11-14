import { Body, Controller, Get, Post, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateTransactionDto } from "../dto/create-transaction.dto";
import { Transaction } from "../infra/transaction.schema";
import { TransactionTypeValidation } from "../pipes/transaction-type-validation.pipe";
import { FilterTransactionDto } from "../dto/filter-transaction.dto";
import { TrasnsactionService } from "./transaction.service";

@Controller('transactions')
export class transactionController{
 constructor(private transactionService: TrasnsactionService) { }
 
 
 @Get()
 getAllTransactions(@Query(ValidationPipe) filterTransactionDto: FilterTransactionDto) {
  return this.transactionService.findAllTransactions(filterTransactionDto);
 }
 
 @Post()
 @UsePipes(ValidationPipe)
 createTransaction(@Body('type', TransactionTypeValidation) createTransactionDto: CreateTransactionDto): Promise<Transaction> {
  return this.transactionService.createTransaction(createTransactionDto)
  
 }
}