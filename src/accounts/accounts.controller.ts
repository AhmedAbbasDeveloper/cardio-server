import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AccountDocument } from './account.schema';
import { AccountsService } from './accounts.service';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { CreateAccountDto } from './dto/create-account.dto';

@Controller('account')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findOne(@Request() req): Promise<AccountDocument | null> {
    return this.accountsService.findOneByUser(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req,
    @Body() createAccountDto: CreateAccountDto,
  ): Promise<AccountDocument> {
    return this.accountsService.create(createAccountDto, req.user.id);
  }
}
