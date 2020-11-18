import { BaseEntity, ObjectID } from "typeorm";
export declare class AccountEntity extends BaseEntity {
    id: ObjectID;
    releases: number;
    balance: number;
    income: number;
    outgoing: number;
}
