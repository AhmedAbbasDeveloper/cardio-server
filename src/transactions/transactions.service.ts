import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Transaction, TransactionDocument } from './transaction.schema';

import { AccountsService } from 'src/accounts/accounts.service';

import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
    private accountService: AccountsService,
  ) {}

  async findAllByUser(user: string): Promise<TransactionDocument[]> {
    const account = await this.accountService.findOneByUser(user);
    return this.transactionModel.find({ account });
  }

  async create(
    { date, amount, merchant, category }: CreateTransactionDto,
    user: string,
  ) {
    const account = await this.accountService.findOneByUser(user);
    return this.transactionModel.create({
      date: new Date(date),
      amount,
      merchant,
      account,
      category,
    });
  }
}
