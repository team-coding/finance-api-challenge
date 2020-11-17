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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrasnsactionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const transaction_repository_1 = require("../../infra/transaction.repository");
let TrasnsactionService = class TrasnsactionService {
    constructor(repo) {
        this.repo = repo;
    }
    async findTransactionById(id) {
        return await this.repo.findOneOrFail(id);
    }
    async findAllTransactions(dto) {
        const transactions = this.repo.findWithFilter(dto);
        return transactions;
    }
    async createTransaction(dto) {
        return (this.repo.create(dto)).save();
    }
    async updateTransaction(dto, id) {
        return await this.repo.updateTransaction(dto, id);
    }
    async deleteOneTransactionById(id) {
        const foundOrFail = await this.findTransactionById(id);
        return await foundOrFail.remove();
    }
};
TrasnsactionService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(transaction_repository_1.TransactionRepository)),
    __metadata("design:paramtypes", [transaction_repository_1.TransactionRepository])
], TrasnsactionService);
exports.TrasnsactionService = TrasnsactionService;
//# sourceMappingURL=transaction.service.js.map