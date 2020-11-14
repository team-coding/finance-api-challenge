import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TransactionType } from '../utils/transaction-type.enum';

export class TransactionTypeValidation implements PipeTransform {

 readonly allowedType = [
  TransactionType.NEGATIVE,
  TransactionType.POSITIVE
 ]

 transform(value: any) {
  if (!this.isValidType(value)) {
   throw new BadRequestException(`${value} is an invalid category`);
  }
  return value;
 }

 private isValidType(value: any):boolean {
  return this.allowedType.includes(value);
 }
}