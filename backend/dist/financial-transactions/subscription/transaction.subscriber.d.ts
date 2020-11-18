import { EntitySubscriberInterface, InsertEvent, RemoveEvent, UpdateEvent } from "typeorm";
import { TransactionEntity } from "../infra/transaction.entity";
export declare class SaveTransactionEvent implements EntitySubscriberInterface<TransactionEntity> {
    listenTo(): typeof TransactionEntity;
    afterRemove(event: RemoveEvent<TransactionEntity>): Promise<void>;
    afterInsert(event: InsertEvent<TransactionEntity>): Promise<void>;
    beforeUpdate(event: UpdateEvent<TransactionEntity>): Promise<void>;
}
