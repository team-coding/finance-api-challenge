import { CreateTransactionDto } from "../dto/create-transaction.dto";
import { TransactionRepository } from "../infra/transaction.repository";
import { TransactionEntity } from "../infra/transaction.entity";
import { UpdateTransactionDto } from "../dto/update-transaction.dto";
import { FilterTransactionDto } from "../dto/filter-transaction.dto";
export declare class TrasnsactionService {
    private repo;
    constructor(repo: TransactionRepository);
    findTransactionById(id: string): Promise<TransactionEntity>;
    findAllTransactions(dto: FilterTransactionDto): Promise<TransactionEntity[]>;
    createTransaction(dto: CreateTransactionDto): Promise<TransactionEntity>;
    updateTransaction(dto: UpdateTransactionDto, id: string): Promise<TransactionEntity>;
    deleteOneTransactionById(id: string): Promise<TransactionEntity>;
}
