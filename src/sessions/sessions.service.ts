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

    // vérifier si une séance est déjà planifié sur ce créneau horaire
    const existingSession = await this.sessionRepository
      .createQueryBuilder('session')
      .where('session.roomId = :roomId', { roomId: sessionData.roomId })
      .where('session.startTime < :endTime AND session.endTime > :startTime', {
        endTime,
        startTime,
      })
      .getOne();
    if (existingSession) {
      throw new ConflictException(
        'A session is already planned at this provided time on this room.',
      );
    }

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

  async findAll(start?: string, end?: string): Promise<Session[]> {
    const queryBuilder = this.sessionRepository.createQueryBuilder('session');

    queryBuilder
      .leftJoinAndSelect('session.movie', 'movie')
      .leftJoinAndSelect('session.room', 'room')
      .orderBy('session.startTime', 'ASC');

    if (start) {
      const startDate = new Date(start);
      if (!isNaN(startDate.getTime())) {
        queryBuilder.andWhere('session.startTime >= :start', {
          start: startDate.toISOString(),
        });
      }
    }

    if (end) {
      const endDate = new Date(end);
      if (!isNaN(endDate.getTime())) {
        queryBuilder.andWhere('session.endTime <= :end', {
          end: endDate.toISOString(),
        });
      }
    }

    return await queryBuilder.getMany();
  }

  async findByMovieId(
    movieId: number,
    start?: string,
    end?: string,
  ): Promise<Session[]> {
    const queryBuilder = this.sessionRepository.createQueryBuilder('session');

    queryBuilder
      .leftJoinAndSelect('session.movie', 'movie')
      .leftJoinAndSelect('session.room', 'room')
      .where('session.movieId = :movieId', { movieId })
      .orderBy('session.startTime', 'ASC');

    if (start) {
      const startDate = new Date(start);
      if (!isNaN(startDate.getTime())) {
        queryBuilder.andWhere('session.startTime >= :start', {
          start: startDate.toISOString(),
        });
      }
    }

    if (end) {
      const endDate = new Date(end);
      if (!isNaN(endDate.getTime())) {
        queryBuilder.andWhere('session.endTime <= :end', {
          end: endDate.toISOString(),
        });
      }
    }

    const sessions = await queryBuilder.getMany();

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
