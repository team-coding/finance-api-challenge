import { BadRequestException } from "@nestjs/common";
import { EntityRepository, Like, Repository } from "typeorm";
import { FilterTransactionDto } from "../dto/filter-transaction.dto";
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
 
 async findWithFilter(filterDto: FilterTransactionDto) {
  let { category = '', type = '', description, filter = '' } = filterDto;
  
  if (!filter) {
   if (!description) {
    if (!type && !category) {
     return await this.find();
    }
   
    if (!type && category) {
     return await this.find({ category });
    }
   
    type = (type === 'out') ? '-' : '+';
    if (type && category) {
     return await this.find({ type, category });
    }
   
    if (type && !category) {
     return await this.find({ type });
    }
   }
  
   return await this.find({
    where: {
     $text: {
      $search: description,
      $language: 'portuguese',
      $caseSensitive: false
     }
    }
   })
  }
  return await this.find({ yearMonth: filter });
 }
}