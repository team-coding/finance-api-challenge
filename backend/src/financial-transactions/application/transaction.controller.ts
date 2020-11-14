import { Body, Controller, Get, Post, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateTransactionDto } from "../dto/create-transaction.dto";
import { TransactionEntity } from "../infra/transaction.entity";
import { TransactionTypeValidation } from "../pipes/transaction-type-validation.pipe";
import { FilterTransactionDto } from "../dto/filter-transaction.dto";
import { TrasnsactionService } from "./transaction.service";

@Controller('transactions')
export class TransactionController{
 constructor(private transactionService: TrasnsactionService) { }
 
 
 @Get()
 getAllTransactions(@Query(ValidationPipe) filterTransactionDto: FilterTransactionDto) {
  return this.transactionService.findAllTransactions(filterTransactionDto);
 }
 
 @Post()
 @UsePipes(ValidationPipe)
 createTransaction(@Body('type', TransactionTypeValidation) createTransactionDto: CreateTransactionDto): Promise<TransactionEntity> {
  return this.transactionService.createTransaction(createTransactionDto)
  
 }
}