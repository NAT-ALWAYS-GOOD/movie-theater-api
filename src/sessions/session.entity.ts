import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CinemaRoom } from '../cinema-rooms/cinema-room.entity';
import { Movie } from '../movie/movie.entity';
import { SeatEntity } from './seat.entity';
import { ReservationEntity } from './reservation.entity';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Movie, (movie: Movie) => movie.sessions)
  movie: Movie;

  @ManyToOne(() => CinemaRoom, (cinemaRoom: CinemaRoom) => cinemaRoom.sessions)
  room: CinemaRoom;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @OneToMany(() => SeatEntity, (seat: SeatEntity) => seat.session)
  seats: SeatEntity[];

  @OneToMany(
    () => ReservationEntity,
    (reservation: ReservationEntity) => reservation.session,
  )
  reservations: ReservationEntity[];
}
