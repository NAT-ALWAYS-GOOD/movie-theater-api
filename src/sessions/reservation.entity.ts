import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { SeatEntity } from './seat.entity';
import { User } from '../users/user.entity';
import { Session } from './session.entity';

@Entity()
export class ReservationEntity {
  @PrimaryColumn()
  reference: string;

  @Column({ nullable: true })
  qrCode: string;

  @OneToMany(() => SeatEntity, (seat: SeatEntity) => seat.reservation)
  seats: SeatEntity[];

  @ManyToOne(() => User, (user: User) => user.reservations)
  user: User;

  @ManyToOne(() => Session, (session: Session) => session.reservations)
  session: Session;
}
