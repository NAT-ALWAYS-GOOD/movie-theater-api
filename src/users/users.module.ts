import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AccountService } from '../account/account.service';
import { Account } from '../account/account.entity';
import { Transaction } from '../account/transaction.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Account, Transaction]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: 'secretKey',
        signOptions: { expiresIn: '60000s' },
      }),
    }),
  ],
  providers: [UserService, JwtStrategy, AccountService],
  controllers: [UserController],
  exports: [JwtStrategy, PassportModule, UserService],
})
export class UsersModule {}
