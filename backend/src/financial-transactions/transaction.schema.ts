import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
 
 @Prop({maxlength:250, required:true})
 description: string;
 
 @Prop({max:99999, required:true})
 value: number;
 
 @Prop({ enum: ['JURIDICO', 'FINANCEIRO'], required:true})
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
 
 @Prop({enum:['-', '+'], required:true})
 type: string;
 
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction)