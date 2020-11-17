"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const transaction_entity_1 = require("./transaction.entity");
let TransactionRepository = class TransactionRepository extends typeorm_1.Repository {
    async updateTransaction(dto, id) {
        try {
            const found = await this.findOne(id);
            if (!found) {
                throw new common_1.BadRequestException(transaction_entity_1.TransactionEntity, `Transaction id: ${id} not found`);
            }
            found.type = dto.type;
            found.category = dto.category;
            found.value = dto.value;
            found.year = dto.year;
            found.yearMonth = dto.yearMonth;
            found.yearMonthDay = dto.yearMonthDay;
            found.description = dto.description;
            return await found.save();
        }
        catch (error) {
            throw new common_1.BadRequestException(error, error.message);
        }
    }
    async findWithFilter(filterDto) {
        let { category = '', type = '', description, filter = '' } = filterDto;
        if (!filter) {
            if (!description) {
                if (!type && !category) {
                    return await this.find();
                }
                if (!type && category) {
                    return await this.find({ category });
                }
                type = (type === 'out') ? '-' : '+';
                if (type && category) {
                    return await this.find({ type, category });
                }
                if (type && !category) {
                    return await this.find({ type });
                }
            }
            return await this.find({
                where: {
                    $text: {
                        $search: description,
                        $language: 'portuguese',
                        $caseSensitive: false
                    }
                }
            });
        }
        return await this.find({ yearMonth: filter });
    }
};
TransactionRepository = __decorate([
    typeorm_1.EntityRepository(transaction_entity_1.TransactionEntity)
], TransactionRepository);
exports.TransactionRepository = TransactionRepository;
//# sourceMappingURL=transaction.repository.js.map