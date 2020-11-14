import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { transactionController } from "./transaction.controller";
import { Transaction, TransactionSchema } from "./transaction.schema";
import { TrasnsactionService } from "./transaction.service";

@Module({
 imports: [MongooseModule.forFeature([{name:Transaction.name, schema:TransactionSchema}])],
 controllers: [transactionController],
 providers:[TrasnsactionService]
})
export class TransactionModule{}