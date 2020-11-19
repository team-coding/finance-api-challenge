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
exports.AccountService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const transaction_repository_1 = require("../../../financial-transactions/infra/transaction.repository");
const typeorm_2 = require("typeorm");
const account_repository_1 = require("../../infra/account.repository");
let AccountService = class AccountService {
    constructor(repo) {
        this.repo = repo;
    }
    async getAccount() {
        return await this.repo.getAccount();
    }
    async saveTransactionEvent(transaction) {
        const repository = typeorm_2.getCustomRepository(account_repository_1.AccountRepository);
        let foundAccount = await repository.getAccount();
        if (foundAccount.length === 0) {
            foundAccount[0] = this.repo.create();
        }
        const account = foundAccount[0];
        if (transaction.type === '-') {
            account.releases += 1;
            account.outgoing += transaction.value;
            account.balance -= transaction.value;
        }
        else {
            account.releases += 1;
            account.income += transaction.value;
            account.balance += transaction.value;
        }
        await foundAccount[0].save();
    }
    async deleteTransactionEvent(transaction) {
        const repository = typeorm_2.getCustomRepository(account_repository_1.AccountRepository);
        const account = await repository.getAccount();
        let foundAccount = account[0];
        if (!foundAccount) {
            return;
        }
        if (transaction.type === '-') {
            foundAccount.releases -= 1;
            foundAccount.outgoing -= transaction.value;
            foundAccount.balance += transaction.value;
        }
        else {
            foundAccount.releases -= 1;
            foundAccount.income -= transaction.value;
            foundAccount.balance -= transaction.value;
        }
    }
    async updateTransactionEvent(newTransaction) {
        try {
            const repository = typeorm_2.getCustomRepository(account_repository_1.AccountRepository);
            const accounts = await repository.getAccount();
            const account = accounts[0];
            const transactionRepo = typeorm_2.getCustomRepository(transaction_repository_1.TransactionRepository);
            const oldTransaction = await transactionRepo.findOne(newTransaction.id);
            if (!oldTransaction || !account) {
                return;
            }
            if (newTransaction.type !== oldTransaction.type || newTransaction.value !== oldTransaction.value) {
                if (newTransaction.type === '+' && newTransaction.type !== oldTransaction.type && newTransaction.value === oldTransaction.value) {
                    account.outgoing -= newTransaction.value;
                    account.income += newTransaction.value;
                    account.balance += newTransaction.value;
                    await account.save();
                    return;
                }
                else if (newTransaction.type === '-' && newTransaction.type !== oldTransaction.type && newTransaction.value === oldTransaction.value) {
                    account.outgoing += newTransaction.value;
                    account.income -= newTransaction.value;
                    account.balance -= newTransaction.value;
                    await account.save();
                    return;
                }
                else if (newTransaction.type === oldTransaction.type && newTransaction.value !== oldTransaction.value && newTransaction.type === '+') {
                    const isAdding = newTransaction.value > oldTransaction.value;
                    if (isAdding) {
                        const difference = (newTransaction.value - oldTransaction.value);
                        account.income += difference;
                        account.balance += difference;
                        await account.save();
                        return;
                    }
                    const difference = (oldTransaction.value - newTransaction.value);
                    account.income -= difference;
                    account.balance += difference;
                    await account.save();
                    return;
                }
                else if (newTransaction.type === oldTransaction.type && newTransaction.value !== oldTransaction.value && newTransaction.type === '-') {
                    const isAdding = newTransaction.value > oldTransaction.value;
                    if (isAdding) {
                        const difference = (newTransaction.value - oldTransaction.value);
                        account.outgoing += difference;
                        account.balance -= difference;
                        await account.save();
                        return;
                    }
                    const difference = (oldTransaction.value - newTransaction.value);
                    account.outgoing -= difference;
                    account.balance += difference;
                    await account.save();
                    return;
                }
                else if (newTransaction.type !== oldTransaction.type && newTransaction.value !== oldTransaction.value && newTransaction.type === '-') {
                    account.outgoing += newTransaction.value;
                    account.income -= oldTransaction.value;
                    account.balance -= oldTransaction.value;
                    account.balance += newTransaction.value;
                    await account.save();
                    return;
                }
                else if (newTransaction.type !== oldTransaction.type && newTransaction.value !== oldTransaction.value && newTransaction.type === '+') {
                    account.outgoing -= oldTransaction.value;
                    account.income += newTransaction.value;
                    account.balance -= oldTransaction.value;
                    account.balance += newTransaction.value;
                    await account.save();
                    return;
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    static async afterDeleteEvent(transaction) {
        await this.prototype.deleteTransactionEvent(transaction);
    }
    static async afterSaveEvent(transaction) {
        await this.prototype.saveTransactionEvent(transaction);
    }
    static async beforeupdateEvent(transaction) {
        await this.prototype.updateTransactionEvent(transaction);
    }
};
AccountService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(account_repository_1.AccountRepository)),
    __metadata("design:paramtypes", [account_repository_1.AccountRepository])
], AccountService);
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map