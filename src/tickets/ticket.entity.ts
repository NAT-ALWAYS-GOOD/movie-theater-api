import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Session } from '../sessions/session.entity';
import { User } from '../users/user.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Session, (session: Session) => session.tickets)
  session: Session;

  @ManyToOne(() => User, (user: User) => user.tickets)
  user: User;

  @Column({ default: false })
  used: boolean;
}
