import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { TransactionDocument } from './transaction.schema';
import { TransactionsService } from './transactions.service';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req): Promise<TransactionDocument[]> {
    return this.transactionsService.findAllByUser(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Request() req,
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<TransactionDocument> {
    return this.transactionsService.create(createTransactionDto, req.user.id);
  }
}
