import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './session.entity';
import { Movie } from '../movie/movie.entity';
import { CinemaRoom } from '../cinema-rooms/cinema-room.entity';
import { CreateSessionDto } from './dto/createsession.dto';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
    @InjectRepository(CinemaRoom)
    private cinemaRoomRepository: Repository<CinemaRoom>,
  ) {}

  async create(sessionData: CreateSessionDto): Promise<Session> {
    const movie = await this.movieRepository.findOneBy({
      id: sessionData.movieId,
    });
    if (!movie) {
      throw new NotFoundException(
        `Movie with ID ${sessionData.movieId} not found`,
      );
    }

    const room = await this.cinemaRoomRepository.findOneBy({
      id: sessionData.roomId,
    });
    if (!room) {
      throw new NotFoundException(
        `Cinema Room with ID ${sessionData.roomId} not found`,
      );
    }

    if (room.inMaintenance) {
      throw new ConflictException(
        'Cinema room is in maintenance, cannot schedule a session',
      );
    }

    // Assure-toi que sessionData.startTime est une instance de Date
    const startTime = new Date(sessionData.startTime);

    // Vérifie si la conversion est valide
    if (isNaN(startTime.getTime())) {
      throw new Error('Invalid start time provided');
    }

    const endTime = new Date(
      startTime.getTime() + movie.duration * 60000 + 1800000,
    );

    // Vérifiez si une séance pour le même film se chevauche avec ce créneau horaire dans n'importe quelle salle
    const overlappingSession = await this.sessionRepository
      .createQueryBuilder('session')
      .where('session.movieId = :movieId', { movieId: movie.id })
      .andWhere(
        'session.startTime < :endTime AND session.endTime > :startTime',
        { endTime, startTime },
      )
      .getOne();

    if (overlappingSession) {
      throw new ConflictException(
        'A session for this movie already exists within the provided time frame in another room.',
      );
    }

    // check if session is during cinema room opening hours (9:00 - 20:00)
    // if not, throw an error
    if (
      startTime.getHours() < 9 ||
      startTime.getHours() >= 20 ||
      endTime.getHours() < 9 ||
      endTime.getHours() >= 20
    ) {
      throw new ConflictException(
        'Session must be scheduled between 9:00 and 20:00',
      );
    }

    const session = new Session();
    session.movie = movie;
    session.room = room;
    session.startTime = startTime;

    // Calculer endTime en ajoutant la durée du film (en minutes converties en millisecondes)
    // et 30 minutes supplémentaires pour le nettoyage et les publicités
    session.endTime = endTime;

    return this.sessionRepository.save(session);
  }
  findAll(): Promise<Session[]> {
    return this.sessionRepository.find({ relations: ['movie', 'room'] });
  }

  async findByMovieId(movieId: number): Promise<Session[]> {
    const sessions = await this.sessionRepository.find({
      where: { movie: { id: movieId } },
      relations: ['movie', 'room'],
    });
    if (sessions.length === 0) {
      throw new NotFoundException(
        `No sessions found for movie with ID ${movieId}`,
      );
    }
    return sessions;
  }

  async findOne(id: number): Promise<Session> {
    const session = await this.sessionRepository
      .createQueryBuilder('session')
      .leftJoinAndSelect('session.movie', 'movie')
      .leftJoinAndSelect('session.room', 'room')
      .where('session.id = :id', { id })
      .getOne();
    if (!session) {
      throw new NotFoundException(`Session with ID ${id} not found`);
    }
    return session;
  }

  async update(id: number, session: Partial<Session>): Promise<Session> {
    await this.sessionRepository.update(id, session);
    const sessionFound = await this.sessionRepository
      .createQueryBuilder('session')
      .leftJoinAndSelect('session.movie', 'movie')
      .leftJoinAndSelect('session.room', 'room')
      .where('session.id = :id', { id })
      .getOne();
    if (!sessionFound) {
      throw new NotFoundException(`Session with ID ${id} not found`);
    }
    return sessionFound;
  }

  async remove(id: number): Promise<void> {
    await this.sessionRepository.delete(id);
  }
}
