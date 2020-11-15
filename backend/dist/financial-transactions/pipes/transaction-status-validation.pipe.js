"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionCategoryValidation = void 0;
const common_1 = require("@nestjs/common");
const transaction_category_enum_1 = require("../utils/transaction-category.enum");
class TransactionCategoryValidation {
    constructor() {
        this.allowedCaetegory = [
            transaction_category_enum_1.TransactionCategory.FUN.toUpperCase(),
            transaction_category_enum_1.TransactionCategory.HEALTH.toUpperCase(),
            transaction_category_enum_1.TransactionCategory.MARKET.toUpperCase(),
            transaction_category_enum_1.TransactionCategory.RECEIVE.toUpperCase(),
            transaction_category_enum_1.TransactionCategory.TRANSPORT.toUpperCase()
        ];
    }
    transform(value) {
        value = value.toUpperCase();
        if (!this.isValidCategory(value)) {
            throw new common_1.BadRequestException(`${value} is an invalid category`);
        }
        return value;
    }
    isValidCategory(value) {
        return this.allowedCaetegory.includes(value);
    }
}
exports.TransactionCategoryValidation = TransactionCategoryValidation;
//# sourceMappingURL=transaction-status-validation.pipe.js.map