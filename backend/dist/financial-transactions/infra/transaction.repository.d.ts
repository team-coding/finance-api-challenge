import { Repository } from "typeorm";
import { FilterTransactionDto } from "../dto/filter-transaction.dto";
import { UpdateTransactionDto } from "../dto/update-transaction.dto";
import { TransactionEntity } from './transaction.entity';
export declare class TransactionRepository extends Repository<TransactionEntity> {
    updateTransaction(dto: UpdateTransactionDto, id: string): Promise<TransactionEntity>;
    findWithFilter(filterDto: FilterTransactionDto): Promise<TransactionEntity[]>;
}
