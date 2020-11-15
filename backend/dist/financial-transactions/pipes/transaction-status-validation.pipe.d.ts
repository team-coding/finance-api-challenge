import { PipeTransform } from "@nestjs/common";
export declare class TransactionCategoryValidation implements PipeTransform {
    readonly allowedCaetegory: string[];
    transform(value: any): any;
    private isValidCategory;
}
