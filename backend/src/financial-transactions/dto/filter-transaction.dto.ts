import { IsIn, IsNotEmpty, IsOptional } from "class-validator"
import { TransactionCategory } from "../transaction-category.enum"

export class FilterTransactionDto{
 @IsOptional()
 @IsIn([
  TransactionCategory.FUN, TransactionCategory.HEALTH,
  TransactionCategory.MARKET, TransactionCategory.RECEIVE,
  TransactionCategory.TRANSPORT
 ])
 status: string
 
 @IsNotEmpty()
 @IsOptional()
 search: string
}