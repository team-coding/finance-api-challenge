import { Controller, Get, Query, ValidationPipe } from "@nestjs/common";
import { FilterTransactionDto } from "./dto/filter-transaction.dto";
import { TrasnsactionService } from "./transaction.service";

@Controller('transactions')
export class transactionController{
 constructor(private transactionService: TrasnsactionService) { }
 

 @Get()
 getAllTransactions(@Query(ValidationPipe) filterTransactionDto: FilterTransactionDto) {
  return this.transactionService.findAllTransactions(filterTransactionDto);
 }
}