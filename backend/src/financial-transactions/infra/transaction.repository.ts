import { BadRequestException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { UpdateTransactionDto } from "../dto/update-transaction.dto";
import{TransactionEntity} from './transaction.entity'

@EntityRepository(TransactionEntity)
export class TransactionRepository extends Repository<TransactionEntity>{
 async updateTransaction(dto: UpdateTransactionDto, id: string) {
  try {
   const found = await this.findOne(id)
   if (!found) {
    throw new BadRequestException(TransactionEntity, `Transaction id: ${id} not found`)
   }
   found.type = dto.type;
   found.category = dto.category;
   found.value = dto.value;
   found.year = dto.year;
   found.yearMonth = dto.yearMonth;
   found.yearMonthDay = dto.yearMonthDay;
   found.description = dto.description;
   return await found.save()
  } catch(error) {
   throw new BadRequestException(error, error.message)
  }
 }
}