import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TransactionCategory } from "../utils/transaction-category.enum";

export class TransactionCategoryValidation implements PipeTransform{

 readonly allowedCaetegory = [
  TransactionCategory.FUN.toUpperCase(),
  TransactionCategory.HEALTH.toUpperCase(),
  TransactionCategory.MARKET.toUpperCase(),
  TransactionCategory.RECEIVE.toUpperCase(),
  TransactionCategory.TRANSPORT.toUpperCase()
 ]

 transform(value: any) {
  value = value.toUpperCase();
  if (!this.isValidCategory(value)) {
   throw new BadRequestException(`${value} is an invalid category`);
  }
  return value;
 }

 private isValidCategory(value: any):boolean {
  return this.allowedCaetegory.includes(value);
}
}