import { IsEnum, IsIn, IsNotEmpty, IsNumber, IsNumberString, Max, MaxLength, Min } from "class-validator";
import { TransactionCategory } from "../utils/transaction-category.enum";
import { TransactionType } from "../utils/transaction-type.enum";

export class CreateTransactionDto{
 
 @IsNotEmpty()
 @MaxLength(250)
 description: string;
 
 @IsNumber()
 @IsNotEmpty()
 @MaxLength(99999)
 value: number;
 
 @IsNotEmpty()
 @IsIn([
  TransactionCategory.FUN,
  TransactionCategory.HEALTH,
  TransactionCategory.MARKET,
  TransactionCategory.RECEIVE,
  TransactionCategory.TRANSPORT
 ])
 category: string;
 
 @IsNotEmpty()
 @IsNumber()
 @Max(2090)
 year: number;
 
 @IsNotEmpty()
 @IsNumber()
 @Max(12)
 @Min(1)
 month: number;
 
 @IsNotEmpty()
 @IsNumber()
 @Min(31)
 @Min(1)
 day: number;
 
 @IsNotEmpty()
 yearMonth: string;
 
 @IsNotEmpty()
 yearMonthDay: string;
 
 @IsNotEmpty()
 @IsIn([
  TransactionType.NEGATIVE,
  TransactionType.POSITIVE
 ])
 type: string;
 
}