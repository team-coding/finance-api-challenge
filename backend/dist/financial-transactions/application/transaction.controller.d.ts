import { CreateTransactionDto } from "../dto/create-transaction.dto";
import { TransactionEntity } from "../infra/transaction.entity";
import { FilterTransactionDto } from "../dto/filter-transaction.dto";
import { TrasnsactionService } from "./transaction.service";
import { UpdateTransactionDto } from "../dto/update-transaction.dto";
export declare class TransactionController {
    private transactionService;
    constructor(transactionService: TrasnsactionService);
    getAllTransactions(filterTransactionDto: FilterTransactionDto): Promise<TransactionEntity[]>;
    getTransactionById(id: string): Promise<TransactionEntity>;
    deteTransactionById(id: string): Promise<TransactionEntity>;
    createTransaction(createTransactionDto: CreateTransactionDto): Promise<TransactionEntity>;
    updateTransaction(id: string, updateTransactionDto: UpdateTransactionDto): Promise<TransactionEntity>;
}
