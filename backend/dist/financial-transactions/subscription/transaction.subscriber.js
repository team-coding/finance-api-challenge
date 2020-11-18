"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveTransactionEvent = void 0;
const typeorm_1 = require("typeorm");
const account_service_1 = require("../application/balance/account.service");
const transaction_entity_1 = require("../infra/transaction.entity");
let SaveTransactionEvent = class SaveTransactionEvent {
    listenTo() {
        return transaction_entity_1.TransactionEntity;
    }
    async afterRemove(event) {
        return await account_service_1.AccountService.afterDeleteEvent(event.entity);
    }
    async afterInsert(event) {
        return await account_service_1.AccountService.afterSaveEvent(event.entity);
    }
    async beforeUpdate(event) {
        return await account_service_1.AccountService.beforeupdateEvent(event.entity);
    }
};
SaveTransactionEvent = __decorate([
    typeorm_1.EventSubscriber()
], SaveTransactionEvent);
exports.SaveTransactionEvent = SaveTransactionEvent;
//# sourceMappingURL=transaction.subscriber.js.map