import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { Account } from './account.entity';
import { Transaction } from './transaction.entity';
import { User } from '../users/user.entity';
import { AccountGuard } from '../guards/account.guard';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from '../users/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account, Transaction, User]),
    UsersModule,
  ],
  controllers: [AccountController],
  providers: [AccountService, AccountGuard, JwtStrategy],
  exports: [AccountService],
})
export class AccountModule {}
