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
exports.CreateTransactionDto = void 0;
const class_validator_1 = require("class-validator");
const transaction_category_enum_1 = require("../utils/transaction-category.enum");
const transaction_type_enum_1 = require("../utils/transaction-type.enum");
class CreateTransactionDto {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.MaxLength(250),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "description", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.Max(99999),
    __metadata("design:type", Number)
], CreateTransactionDto.prototype, "value", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsIn([
        transaction_category_enum_1.TransactionCategory.FUN,
        transaction_category_enum_1.TransactionCategory.HEALTH,
        transaction_category_enum_1.TransactionCategory.MARKET,
        transaction_category_enum_1.TransactionCategory.RECEIVE,
        transaction_category_enum_1.TransactionCategory.TRANSPORT
    ]),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "category", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    class_validator_1.Max(2090),
    __metadata("design:type", Number)
], CreateTransactionDto.prototype, "year", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    class_validator_1.Max(12),
    class_validator_1.Min(1),
    __metadata("design:type", Number)
], CreateTransactionDto.prototype, "month", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    class_validator_1.Max(31),
    class_validator_1.Min(1),
    __metadata("design:type", Number)
], CreateTransactionDto.prototype, "day", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "yearMonth", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "yearMonthDay", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsIn([
        transaction_type_enum_1.TransactionType.NEGATIVE,
        transaction_type_enum_1.TransactionType.POSITIVE
    ]),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "type", void 0);
exports.CreateTransactionDto = CreateTransactionDto;
//# sourceMappingURL=create-transaction.dto.js.map