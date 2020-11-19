import { AccountEntity } from '../../infra/account.entity';
import { AccountRepository } from '../../infra/account.repository';
import { TransactionEntity } from '../../infra/transaction.entity';
export declare class AccountService {
    private repo;
    constructor(repo: AccountRepository);
    getAccount(): Promise<AccountEntity[]>;
    saveTransactionEvent(transaction: TransactionEntity): Promise<void>;
    deleteTransactionEvent(transaction: TransactionEntity): Promise<void>;
    updateTransactionEvent(newTransaction: TransactionEntity): Promise<void>;
    static afterDeleteEvent(transaction: TransactionEntity): Promise<void>;
    static afterSaveEvent(transaction: TransactionEntity): Promise<void>;
    static beforeupdateEvent(transaction: TransactionEntity): Promise<void>;
}
