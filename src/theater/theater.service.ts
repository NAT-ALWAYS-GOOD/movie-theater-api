import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { TheaterEntity } from './theater.entity';
import { CreateTheaterDTO } from './dto/createtheater.dto';
import { User } from '../users/user.entity';
import { Session } from '../sessions/session.entity';
import { Movie } from '../movie/movie.entity';
import { MovieSessionsGroup, SessionWithoutMovie } from './theater.structs';

@Injectable()
export class TheaterService {
  constructor(
    @InjectRepository(TheaterEntity)
    private theaterRepository: Repository<TheaterEntity>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  create(theaterDTO: CreateTheaterDTO): Promise<TheaterEntity> {
    return this.theaterRepository.save(theaterDTO);
  }

  findAll(): Promise<TheaterEntity[]> {
    return this.theaterRepository.find();
  }

  delete(id: number) {
    return this.theaterRepository.delete(id);
  }

  async favorite(theaterId: number, userId: number) {
    const theater = await this.theaterRepository.findOneBy({ id: theaterId });
    if (!theater) {
      throw new NotFoundException('Theater not found');
    }

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.favoriteTheater = theater;
    await this.userRepository.save(user);
  }

  async resetFavorite(userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.favoriteTheater = null;
    await this.userRepository.save(user);
  }

  async getAllMoviesSessionsFromTheater(
    theaterId: number,
  ): Promise<MovieSessionsGroup[]> {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0); // met l'heure à 00h00:00

    const endOfPeriod = new Date(startOfToday);
    endOfPeriod.setDate(endOfPeriod.getDate() + 7); // +7 jours
    endOfPeriod.setHours(23, 59, 59, 999);

    // récupération des sessions qui ont lieu entre maintenant et dans 7 jours (sans prendre compte de l'heure), dans un théâtre donné
    const sessions = await this.sessionRepository.find({
      where: {
        room: { theater: { id: theaterId } },
        startTime: Between(startOfToday, endOfPeriod),
      },
      relations: ['movie', 'room'],
    });

    if (!sessions.length) return [];

    // Pour regrouper par film
    const movieMap: Record<number, MovieSessionsGroup> = {};

    for (const session of sessions) {
      const movieId = session.movie.id;

      if (!movieMap[movieId]) {
        movieMap[movieId] = {
          movie: session.movie,
          sessions: [], // sera de type SessionWithoutMovie[]
        };
      }

      // On copie la session puis on supprime `movie`
      // (ou on la met à undefined, peu importe, on veut qu'elle soit absente)
      const sessionWithoutMovie: SessionWithoutMovie = {
        ...session,
      };
      delete (sessionWithoutMovie as Partial<Session>).movie;

      movieMap[movieId].sessions.push(sessionWithoutMovie);
    }

    return Object.values(movieMap);
  }
}
