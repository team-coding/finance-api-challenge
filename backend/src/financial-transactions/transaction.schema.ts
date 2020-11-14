import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TransactionCategory } from './transaction-category.enum';
import { TransactionType } from './transaction-type.enum';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
 
 @Prop({maxlength:250, required:true})
 description: string;
 
 @Prop({max:99999, required:true})
 value: number;
 
 @Prop({
  enum: [
   TransactionCategory.FUN, TransactionCategory.HEALTH,
   TransactionCategory.MARKET, TransactionCategory.RECEIVE,
   TransactionCategory.TRANSPORT
 ], required:true})
 category: string;
 
 @Prop({max:2090, min:2000, required:true})
 year: number;
 
 @Prop({max:12, min:1, required:true})
 month: number;
 
 @Prop({max:31, min:1, required:true})
 day: number;
 
 @Prop({required:true})
 yearMonth: string;
 
 @Prop({required:true})
 yearMonthDay: string;
 
  @Prop({
    enum: [TransactionType.NEGATIVE,
    TransactionType.POSITIVE], required: true
  })
 type: string;
 
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction)