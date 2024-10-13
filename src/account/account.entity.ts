import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Transaction } from './transaction.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.account)
  user: User;

  @Column()
  balance: number;

  @OneToMany(
    () => Transaction,
    (transaction: Transaction) => transaction.account,
  )
  transactions: Transaction[];
}
