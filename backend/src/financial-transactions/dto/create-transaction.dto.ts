import { IsEnum, IsNotEmpty, IsNumber, IsNumberString, Max, MaxLength, Min } from "class-validator";

export class CreateTransactionDto{
 
 @IsNotEmpty()
 @MaxLength(250)
 description: string;
 
 @IsNumber()
 @IsNotEmpty()
 @MaxLength(99999)
 value: number;
 
 @IsNotEmpty()
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
 type: string;
 
}