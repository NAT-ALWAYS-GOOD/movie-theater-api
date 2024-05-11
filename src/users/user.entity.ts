import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Ticket } from '../tickets/ticket.entity';
import { SuperTicket } from '../tickets/superticket.entity';
import { Account } from '../account/account.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  role: string; // Peut-être 'admin' ou 'client'

  @OneToMany(() => Ticket, (ticket: Ticket) => ticket.user)
  tickets: Ticket[];

  @OneToMany(() => SuperTicket, (superTicket: SuperTicket) => superTicket.user)
  superTickets: SuperTicket[];

  @OneToOne(() => Account)
  @JoinColumn()
  account: Account;

  @Column({ default: true })
  isActive: boolean;
}
