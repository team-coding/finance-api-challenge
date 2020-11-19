import { EntitySubscriberInterface, EventSubscriber, getCustomRepository, InsertEvent, RemoveEvent, UpdateEvent } from "typeorm";
import { AccountService } from "../application/balance/account.service";
import { TransactionEntity } from "../infra/transaction.entity";

@EventSubscriber()
export class SaveTransactionEvent implements EntitySubscriberInterface<TransactionEntity>{

 listenTo() {
  return TransactionEntity;
 }

 async afterRemove (event: RemoveEvent<TransactionEntity>): Promise<void> {
  return await AccountService.afterDeleteEvent(event.entity)
 }
 
 async afterInsert(event: InsertEvent<TransactionEntity>): Promise<void> {
  return await AccountService.afterSaveEvent(event.entity)
 }

 async beforeUpdate(event: UpdateEvent<TransactionEntity>): Promise<void> {
  return await AccountService.beforeupdateEvent(event.entity)
 }
}