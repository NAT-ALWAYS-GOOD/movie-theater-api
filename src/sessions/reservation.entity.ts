import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { SeatEntity } from './seat.entity';
import { User } from '../users/user.entity';
import { Session } from './session.entity';
import { ReservationDTO } from './dto/reservation.dto';

@Entity()
export class ReservationEntity {
  @PrimaryColumn()
  reference: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @Column({ nullable: true, type: 'text' })
  qrCode: string;

  @OneToMany(() => SeatEntity, (seat: SeatEntity) => seat.reservation)
  seats: SeatEntity[];

  @ManyToOne(() => User, (user: User) => user.reservations)
  user: User;

  @ManyToOne(() => Session, (session: Session) => session.reservations)
  session: Session;

  public static toDto(res: ReservationEntity): ReservationDTO {
    return {
      reference: res.reference,
      qrCode: res.qrCode,
      seats: res.seats.map((seat) => seat.seatNumber),
      user: res.user.username,
      session: res.session,
    };
  }
}
