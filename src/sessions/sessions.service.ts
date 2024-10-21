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
import { ReservationEntity } from './reservation.entity';
import { CreateReservationDTO } from './dto/createreservation.dto';
import { SeatEntity } from './seat.entity';
import * as QRCode from 'qrcode';
import { User } from '../users/user.entity';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
    @InjectRepository(CinemaRoom)
    private cinemaRoomRepository: Repository<CinemaRoom>,
    @InjectRepository(ReservationEntity)
    private reservationRepository: Repository<ReservationEntity>,
    @InjectRepository(SeatEntity)
    private seatRepository: Repository<SeatEntity>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
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

    const startTime = new Date(sessionData.startTime);

    if (isNaN(startTime.getTime())) {
      throw new Error('Invalid start time provided');
    }

    const endTime = new Date(
      startTime.getTime() + movie.duration * 60000 + 1800000,
    );

    const existingSession = await this.sessionRepository
      .createQueryBuilder('session')
      .where('session.roomId = :roomId', { roomId: sessionData.roomId })
      .andWhere(
        'session.startTime < :endTime AND session.endTime > :startTime',
        {
          endTime,
          startTime,
        },
      )
      .getOne();
    if (existingSession) {
      throw new ConflictException(
        'A session is already planned at this provided time on this room.',
      );
    }

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

    const session = new Session();
    session.seats = await this.createSeats(session);
    session.movie = movie;
    session.room = room;
    session.startTime = startTime;
    session.endTime = endTime;

    return this.sessionRepository.save(session);
  }

  private async createSeats(session: Session): Promise<SeatEntity[]> {
    const seats: SeatEntity[] = [];
    for (let i = 1; i <= session.room.capacity; i++) {
      const seat = new SeatEntity();
      seat.seatNumber = i;
      seat.session = session;
      seats.push(seat);
    }
    session.seats = seats;
    return await this.seatRepository.save(seats);
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

  async createReservation(
    createReservation: CreateReservationDTO,
  ): Promise<ReservationEntity> {
    let reference: string;
    let exists = true;

    do {
      reference = this.generateReservationReference();
      const existingReservation = await this.reservationRepository.findOneBy({
        reference,
      });
      exists = !!existingReservation;
    } while (exists);

    const session = await this.sessionRepository.findOneBy({
      id: createReservation.sessionId,
    });
    if (!session) {
      throw new NotFoundException(
        `Session with ID ${createReservation.sessionId} not found`,
      );
    }

    const seats: SeatEntity[] = [];

    for (const seatNumber of createReservation.seats) {
      const seat = await this.seatRepository.findOneBy({
        seatNumber,
        session: session,
      });
      if (!seat) {
        throw new NotFoundException(
          `Seat with number ${seatNumber} not found for session with ID ${createReservation.sessionId}`,
        );
      }
      if (seat.reservation) {
        throw new ConflictException(
          `Seat with number ${seatNumber} is already reserved`,
        );
      }
      seats.push(seat);
    }

    const reservation = new ReservationEntity();
    for (const seat of seats) {
      seat.reservation = reservation;
    }
    await this.seatRepository.save(seats);
    reservation.seats = seats;
    reservation.reference = reference;
    const user = await this.userRepository.findOneBy({
      id: createReservation.userId,
    });
    if (!user) {
      throw new NotFoundException(
        `User with ID ${createReservation.userId} not found`,
      );
    }
    reservation.user = user;
    reservation.session = session;
    reservation.qrCode = await this.generateReservationQRCode(
      reservation.reference,
    );
    await this.reservationRepository.save(reservation);

    return reservation;
  }

  private generateReservationReference(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';

    const randomLetters = Array.from({ length: 3 }, () =>
      letters.charAt(Math.floor(Math.random() * letters.length)),
    );
    const randomDigits = Array.from({ length: 4 }, () =>
      digits.charAt(Math.floor(Math.random() * digits.length)),
    );

    const positions = [0, 1, 2, 3, 4, 5, 6];
    const letterPositions = [];
    while (letterPositions.length < 3) {
      const pos = positions.splice(
        Math.floor(Math.random() * positions.length),
        1,
      )[0];
      letterPositions.push(pos);
    }
    const digitPositions = positions;

    const codeArray: string[] = [];
    letterPositions.forEach((pos, index) => {
      codeArray[pos] = randomLetters[index];
    });
    digitPositions.forEach((pos, index) => {
      codeArray[pos] = randomDigits[index];
    });
    return codeArray.join('');
  }

  private async generateReservationQRCode(reference: string): Promise<string> {
    try {
      // Générer le QR code en tant que Data URL
      return await QRCode.toDataURL(reference);
    } catch (error) {
      throw new Error('Failed to generate QR Code');
    }
  }
}
