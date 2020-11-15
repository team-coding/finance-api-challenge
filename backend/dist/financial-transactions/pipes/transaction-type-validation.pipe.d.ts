import { PipeTransform } from "@nestjs/common";
import { TransactionType } from '../utils/transaction-type.enum';
export declare class TransactionTypeValidation implements PipeTransform {
    readonly allowedType: TransactionType[];
    transform(value: any): any;
    private isValidType;
}
