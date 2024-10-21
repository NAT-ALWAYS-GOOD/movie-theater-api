import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReservationEntity } from '../sessions/reservation.entity';
import { TheaterEntity } from '../theater/theater.entity';

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

  @ManyToOne(() => TheaterEntity, (theater: TheaterEntity) => theater.fans)
  favoriteTheater?: TheaterEntity | null;
}
