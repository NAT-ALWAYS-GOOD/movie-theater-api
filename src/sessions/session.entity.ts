import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { CinemaRoom } from '../cinema-rooms/cinema-room.entity'; // Assurez-vous que le chemin est correct
import { Movie } from '../movie/movie.entity';
import { Ticket } from '../tickets/ticket.entity';
import { SuperTicketUsage } from '../tickets/superticketusage.entity'; // Assurez-vous que le chemin est correct

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

  @OneToMany(() => Ticket, (ticket: Ticket) => ticket.session)
  tickets: Ticket[];

  @OneToMany(
    () => SuperTicketUsage,
    (superTicketUsage) => superTicketUsage.session,
  )
  superTicketUsages: SuperTicketUsage[];
}
