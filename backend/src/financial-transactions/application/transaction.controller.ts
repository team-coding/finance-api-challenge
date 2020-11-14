import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateTransactionDto } from "../dto/create-transaction.dto";
import { TransactionEntity } from "../infra/transaction.entity";
import { FilterTransactionDto } from "../dto/filter-transaction.dto";
import { TrasnsactionService } from "./transaction.service";
import { UpdateTransactionDto } from "../dto/update-transaction.dto";

@Controller('/api/transactions')
export class TransactionController{
 constructor(private transactionService: TrasnsactionService) { }
 
 
 @Get()
 getAllTransactions(@Query(ValidationPipe) filterTransactionDto: FilterTransactionDto) {
  return this.transactionService.findAllTransactions(filterTransactionDto);
 }
 
 @Get('/:id')
 getTransactionById(@Param('id') id:string) {
  return this.transactionService.findTransactionById(id);
 }
 
 @Delete('/:id')
 deteTransactionById(@Param('id') id: string) {
  return this.transactionService.deleteOneTransactionById(id);
 }
 
 @Post()
 @UsePipes(ValidationPipe)
 createTransaction(@Body() createTransactionDto: CreateTransactionDto): Promise<TransactionEntity> {
  return this.transactionService.createTransaction(createTransactionDto)
 }
 
 @Patch('/:id')
 @UsePipes(ValidationPipe)
 updateTransaction(
  @Param('id')id:string,
  @Body() updateTransactionDto: UpdateTransactionDto): Promise<TransactionEntity>{
   return this.transactionService.updateTransaction(updateTransactionDto, id);
  }
 }