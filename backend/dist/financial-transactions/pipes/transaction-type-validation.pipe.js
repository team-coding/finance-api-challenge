"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionTypeValidation = void 0;
const common_1 = require("@nestjs/common");
const transaction_type_enum_1 = require("../utils/transaction-type.enum");
class TransactionTypeValidation {
    constructor() {
        this.allowedType = [
            transaction_type_enum_1.TransactionType.NEGATIVE,
            transaction_type_enum_1.TransactionType.POSITIVE
        ];
    }
    transform(value) {
        if (!this.isValidType(value)) {
            throw new common_1.BadRequestException(`${value} is an invalid category`);
        }
        return value;
    }
    isValidType(value) {
        return this.allowedType.includes(value);
    }
}
exports.TransactionTypeValidation = TransactionTypeValidation;
//# sourceMappingURL=transaction-type-validation.pipe.js.map