import { Movie } from '../../movie/movie.entity';
import { CinemaRoom } from '../../cinema-rooms/cinema-room.entity';
import { Session } from '../session.entity';

export class SessionDTO {
  id: number;
  movie: Movie;
  room: CinemaRoom;
  startTime: Date;
  endTime: Date;
  seats: {
    seatNumber: number;
    isReserved: boolean;
  }[];

  static fromEntity(session: Session) {
    return {
      id: session.id,
      movie: session.movie,
      room: session.room,
      startTime: session.startTime,
      endTime: session.endTime,
      seats: session.seats.map((seat) => ({
        seatNumber: seat.seatNumber,
        isReserved: !!seat.reservation,
      })),
    };
  }
}
