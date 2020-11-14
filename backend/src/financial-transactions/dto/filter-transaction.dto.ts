import { IsIn, IsNotEmpty, IsOptional } from "class-validator"
import { TransactionCategory } from "../transaction-category.enum"
import { TransactionType } from "../transaction-type.enum"

export class FilterTransactionDto{
 @IsOptional()
 @IsIn([
  TransactionCategory.FUN, TransactionCategory.HEALTH,
  TransactionCategory.MARKET, TransactionCategory.RECEIVE,
  TransactionCategory.TRANSPORT
 ])
 status: string
 
 @IsOptional()
 @IsIn([
  TransactionType.NEGATIVE,
  TransactionType.POSITIVE
 ])
 type: string
 
 @IsNotEmpty()
 @IsOptional()
 search: string
}