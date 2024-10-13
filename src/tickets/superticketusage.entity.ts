import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { SuperTicket } from './superticket.entity';
import { Session } from '../sessions/session.entity';

@Entity()
export class SuperTicketUsage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => SuperTicket,
    (superTicket: SuperTicket) => superTicket.usages,
  )
  superTicket: SuperTicket;

  @ManyToOne(() => Session, (session: Session) => session.superTicketUsages)
  session: Session;

  @Column()
  usedAt: Date;
}
