import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class TransactionEntity extends BaseEntity{
  @ObjectIdColumn()
  id:ObjectID
  
  @Column({nullable:false})
  description: string;
  
  @Column({nullable:false, type:Number})
  value: number;
  
  @Column({nullable:false})
  category: string;
  
  @Column({nullable:false})
  year: number;
  
  @Column({nullable:false})
  month: number;
  
  @Column({nullable:false})
  day: number;
  
  @Column({nullable:false})
  yearMonth: string;
  
  @Column({nullable:false})
  yearMonthDay: string;
  
  @Column({nullable: false})
  type: string;
  
}

