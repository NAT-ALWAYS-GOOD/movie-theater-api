import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './account.entity';
import { Transaction, TransactionType } from './transaction.entity';
import { User } from '../users/user.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async createAccount(userId: number): Promise<Account> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    const account = this.accountRepository.create({
      user,
      balance: 0,
    });
    return this.accountRepository.save(account);
  }

  async deposit(accountId: number, amount: number): Promise<Transaction> {
    const account = await this.accountRepository.findOneBy({ id: accountId });
    if (!account) {
      throw new NotFoundException('Account does not exist');
    }
    account.balance += amount;
    await this.accountRepository.save(account);

    const transaction = this.transactionRepository.create({
      account,
      type: TransactionType.DEPOSIT,
      amount,
    });
    return this.transactionRepository.save(transaction);
  }

  async withdraw(accountId: number, amount: number): Promise<Transaction> {
    const account = await this.accountRepository.findOneBy({ id: accountId });
    if (!account) {
      throw new NotFoundException('Account does not exist');
    }
    if (account.balance < amount) {
      throw new ConflictException('Insufficient funds');
    }
    account.balance -= amount;
    await this.accountRepository.save(account);

    const transaction = this.transactionRepository.create({
      account,
      type: TransactionType.WITHDRAWAL,
      amount,
    });
    return this.transactionRepository.save(transaction);
  }

  async getTransactions(accountId: number): Promise<Transaction[]> {
    const account = await this.accountRepository.findOneBy({ id: accountId });
    if (!account) {
      throw new NotFoundException('Account does not exist');
    }
    return this.transactionRepository.find({
      where: { account: { id: accountId } },
      relations: ['account'],
    });
  }

  async getBalance(accountId: number) {
    const account = await this.accountRepository.findOneBy({ id: accountId });
    if (!account) {
      throw new NotFoundException('Account does not exist');
    }
    return { balance: account.balance };
  }
}
