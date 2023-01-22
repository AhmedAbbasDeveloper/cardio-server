import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

import { Account } from 'src/accounts/account.schema';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema({ timestamps: true })
export class Transaction {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Account',
    required: true,
  })
  account: Account;

  @Prop()
  date: number;

  @Prop()
  amount: number;

  @Prop()
  merchant: string;

  @Prop()
  category: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
