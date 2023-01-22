import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Account, AccountDocument } from './account.schema';

import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
  ) {}

  async findOneByUser(user: string): Promise<AccountDocument | null> {
    return this.accountModel.findOne({ user });
  }

  async create(
    { creditLimit }: CreateAccountDto,
    user: string,
  ): Promise<AccountDocument> {
    return this.accountModel.create({
      creditLimit,
      balance: 0,
      user,
    });
  }

  async updateBalance(
    accountId: string,
    amount: number,
  ): Promise<AccountDocument> {
    return this.accountModel.findByIdAndUpdate(
      accountId,
      { $inc: { balance: amount } },
      { new: true },
    );
  }
}
