import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionRepository } from "../../infra/transaction.repository";
import { TransactionController } from "../transaction/transaction.controller";
import { TrasnsactionService } from "../transaction/transaction.service";

@Module({
 imports: [TypeOrmModule.forFeature([TransactionRepository])],
 controllers: [TransactionController],
 providers:[TrasnsactionService]
})
export class TransactionModule{}