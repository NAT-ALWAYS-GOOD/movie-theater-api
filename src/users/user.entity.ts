import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SeatEntity } from '../sessions/seat.entity';
import { ReservationEntity } from '../sessions/reservation.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => ReservationEntity, (res: ReservationEntity) => res.user)
  reservations: ReservationEntity[];
}
