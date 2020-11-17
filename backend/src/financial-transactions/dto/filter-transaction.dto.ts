import { IsIn, IsOptional } from "class-validator";
import { TransactionCategory } from "../utils/transaction-category.enum";

export class FilterTransactionDto{
 @IsOptional()
 @IsIn([
  TransactionCategory.FUN, TransactionCategory.HEALTH,
  TransactionCategory.MARKET, TransactionCategory.RECEIVE,
  TransactionCategory.TRANSPORT
 ])
 category: string
 
 @IsOptional()
 @IsIn(['in', 'out'])
 type: string

 @IsOptional()
 description: string

 @IsOptional()
 filter: string;
}