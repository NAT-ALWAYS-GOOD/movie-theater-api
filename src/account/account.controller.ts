import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountGuard } from '../guards/account.guard';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @UseGuards(AccountGuard)
  @Patch('/:id/deposit')
  deposit(@Param('id') accountId: number, @Body() body: { amount: number }) {
    return this.accountService.deposit(accountId, body.amount);
  }

  @UseGuards(AccountGuard)
  @Patch('/:id/withdraw')
  withdraw(@Param('id') accountId: number, @Body() body: { amount: number }) {
    return this.accountService.withdraw(accountId, body.amount);
  }

  @UseGuards(AccountGuard)
  @Get('/:id/transactions')
  getTransactions(@Param('id') accountId: number) {
    return this.accountService.getTransactions(accountId);
  }

  @UseGuards(AccountGuard)
  @Get('/:id/balance')
  getBalance(@Param('id') accountId: number) {
    return this.accountService.getBalance(accountId);
  }
}
