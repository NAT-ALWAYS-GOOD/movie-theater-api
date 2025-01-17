import { Session } from '../sessions/session.entity';
import { Movie } from '../movie/movie.entity';
import { ApiProperty } from '@nestjs/swagger';

export type SessionWithoutMovie = Omit<Session, 'movie'>;

export class MovieSessionsGroup {
  @ApiProperty()
  movie: Movie;
  @ApiProperty()
  sessions: SessionWithoutMovie[];
}
