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

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Account, Transaction]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secretKey', // Utiliser une clé plus sécurisée et la stocker de manière sécurisée
      signOptions: { expiresIn: '60000s' }, // Configurer selon les besoins
    }),
  ],
  providers: [UserService, JwtStrategy, AccountService],
  controllers: [UserController],
  exports: [JwtStrategy, PassportModule, UserService],
})
export class UsersModule {}
