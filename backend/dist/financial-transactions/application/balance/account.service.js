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
        console.log("CHAMOU O EVENTO NO SERVICE");
        console.log(foundAccount);
        console.log('RECEBEU UMA TRANSAÇÃO');
        console.log(transaction);
        if (foundAccount.length === 0) {
            console.log('ENTROU NO CRIAR NOVA CONTA');
            foundAccount[0] = this.repo.create();
        }
        if (transaction.type === '-') {
            foundAccount[0].releases = 1 + foundAccount[0].releases;
            foundAccount[0].outgoing = transaction.value + foundAccount[0].outgoing;
            foundAccount[0].balance = foundAccount[0].balance - transaction.value;
        }
        else {
            foundAccount[0].releases = 1 + foundAccount[0].releases;
            foundAccount[0].income = transaction.value + foundAccount[0].income;
            foundAccount[0].balance += transaction.value + foundAccount[0].balance;
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
    static async afterDeleteEvent(transaction) {
        await this.prototype.deleteTransactionEvent(transaction);
    }
    static async afterSaveEvent(transaction) {
        await this.prototype.saveTransactionEvent(transaction);
    }
};
AccountService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(account_repository_1.AccountRepository)),
    __metadata("design:paramtypes", [account_repository_1.AccountRepository])
], AccountService);
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map