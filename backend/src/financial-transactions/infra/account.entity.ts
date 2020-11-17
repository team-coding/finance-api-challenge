import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AccountEntity extends BaseEntity{
 @ObjectIdColumn()
 id: ObjectID;

 @Column()
 releases: number;

 @Column()
 balance: number;

 @Column()
 income: number;

 @Column()
 outgoing: number;
}