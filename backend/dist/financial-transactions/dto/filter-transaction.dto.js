"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterTransactionDto = void 0;
const class_validator_1 = require("class-validator");
const transaction_category_enum_1 = require("../utils/transaction-category.enum");
class FilterTransactionDto {
}
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsIn([
        transaction_category_enum_1.TransactionCategory.FUN, transaction_category_enum_1.TransactionCategory.HEALTH,
        transaction_category_enum_1.TransactionCategory.MARKET, transaction_category_enum_1.TransactionCategory.RECEIVE,
        transaction_category_enum_1.TransactionCategory.TRANSPORT
    ]),
    __metadata("design:type", String)
], FilterTransactionDto.prototype, "category", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsIn(['in', 'out']),
    __metadata("design:type", String)
], FilterTransactionDto.prototype, "type", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], FilterTransactionDto.prototype, "description", void 0);
exports.FilterTransactionDto = FilterTransactionDto;
//# sourceMappingURL=filter-transaction.dto.js.map