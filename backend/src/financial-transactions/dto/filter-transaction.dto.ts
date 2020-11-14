import { IsIBAN, IsIn, IsNotEmpty, IsOptional } from "class-validator"

export class FilterTransactionDto{
 @IsOptional()
 @IsIn([])
 status: string
 
 @IsNotEmpty()
 @IsOptional()
 search: string
}