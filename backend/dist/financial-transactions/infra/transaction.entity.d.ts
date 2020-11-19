import { BaseEntity, ObjectID } from 'typeorm';
export declare class TransactionEntity extends BaseEntity {
    id: ObjectID;
    description: string;
    value: number;
    category: string;
    year: number;
    month: number;
    day: number;
    yearMonth: string;
    yearMonthDay: string;
    type: string;
}
