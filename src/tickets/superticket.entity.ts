import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { SuperTicketUsage } from './superticketusage.entity';

@Entity()
export class SuperTicket {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user: User) => user.superTickets)
  user: User;

  @Column()
  remainingUses: number;

  @OneToMany(
    () => SuperTicketUsage,
    (superTicketUsage) => superTicketUsage.superTicket,
  )
  usages: SuperTicketUsage[];
}
