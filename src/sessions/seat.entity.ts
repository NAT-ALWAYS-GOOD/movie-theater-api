import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Session } from './session.entity';
import { ReservationEntity } from './reservation.entity';

@Entity()
export class SeatEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  seatNumber: number;

  @ManyToOne(() => Session, (session: Session) => session.seats)
  session: Session;

  @ManyToOne(
    () => ReservationEntity,
    (reservation: ReservationEntity) => reservation.seats,
    { nullable: true },
  )
  reservation?: ReservationEntity;
}
