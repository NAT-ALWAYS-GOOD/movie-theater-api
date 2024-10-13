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
import { ApiResponse } from '@nestjs/swagger';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @ApiResponse({
    status: 200,
    description: 'Account has been credited',
  })
  @UseGuards(AccountGuard)
  @Patch('/:id/deposit')
  deposit(@Param('id') accountId: number, @Body() body: { amount: number }) {
    return this.accountService.deposit(accountId, body.amount);
  }

  @ApiResponse({
    status: 200,
    description: 'Account has been withdrew',
  })
  @UseGuards(AccountGuard)
  @Patch('/:id/withdraw')
  withdraw(@Param('id') accountId: number, @Body() body: { amount: number }) {
    return this.accountService.withdraw(accountId, body.amount);
  }

  @ApiResponse({
    status: 200,
    description: 'Transactions of specific account',
  })
  @UseGuards(AccountGuard)
  @Get('/:id/transactions')
  getTransactions(@Param('id') accountId: number) {
    return this.accountService.getTransactions(accountId);
  }

  @ApiResponse({
    status: 200,
    description: 'Balance of account',
  })
  @UseGuards(AccountGuard)
  @Get('/:id/balance')
  getBalance(@Param('id') accountId: number) {
    return this.accountService.getBalance(accountId);
  }
}
