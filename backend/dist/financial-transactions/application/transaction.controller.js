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
exports.TransactionController = void 0;
const common_1 = require("@nestjs/common");
const create_transaction_dto_1 = require("../dto/create-transaction.dto");
const filter_transaction_dto_1 = require("../dto/filter-transaction.dto");
const transaction_service_1 = require("./transaction.service");
const update_transaction_dto_1 = require("../dto/update-transaction.dto");
let TransactionController = class TransactionController {
    constructor(transactionService) {
        this.transactionService = transactionService;
    }
    getAllTransactions(filterTransactionDto) {
        return this.transactionService.findAllTransactions(filterTransactionDto);
    }
    getTransactionById(id) {
        return this.transactionService.findTransactionById(id);
    }
    deteTransactionById(id) {
        return this.transactionService.deleteOneTransactionById(id);
    }
    createTransaction(createTransactionDto) {
        return this.transactionService.createTransaction(createTransactionDto);
    }
    updateTransaction(id, updateTransactionDto) {
        return this.transactionService.updateTransaction(updateTransactionDto, id);
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_transaction_dto_1.FilterTransactionDto]),
    __metadata("design:returntype", void 0)
], TransactionController.prototype, "getAllTransactions", null);
__decorate([
    common_1.Get('/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TransactionController.prototype, "getTransactionById", null);
__decorate([
    common_1.Delete('/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TransactionController.prototype, "deteTransactionById", null);
__decorate([
    common_1.Post(),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_transaction_dto_1.CreateTransactionDto]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "createTransaction", null);
__decorate([
    common_1.Patch('/:id'),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_transaction_dto_1.UpdateTransactionDto]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "updateTransaction", null);
TransactionController = __decorate([
    common_1.Controller('/api/transactions'),
    __metadata("design:paramtypes", [transaction_service_1.TrasnsactionService])
], TransactionController);
exports.TransactionController = TransactionController;
//# sourceMappingURL=transaction.controller.js.map