import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CinemaRoom } from './cinema-room.entity';
import { Session } from '../sessions/session.entity';
import { CreateRoomDto } from './dto/createroom.dto';

@Injectable()
export class CinemaRoomService {
  constructor(
    @InjectRepository(CinemaRoom)
    private cinemaRoomRepository: Repository<CinemaRoom>,
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
  ) {}

  create(cinemaRoom: CreateRoomDto): Promise<CinemaRoom> {
    return this.cinemaRoomRepository.save(cinemaRoom);
  }

  findAll(): Promise<CinemaRoom[]> {
    return this.cinemaRoomRepository.find();
  }

  async findOne(id: number): Promise<CinemaRoom> {
    const cinemaRoom = await this.cinemaRoomRepository.findOneBy({ id });
    if (!cinemaRoom) {
      throw new Error('Cinema room not found');
    }
    return cinemaRoom;
  }

  async findSchedule(
    roomId: number,
    start?: string,
    end?: string,
  ): Promise<Session[]> {
    const room = await this.cinemaRoomRepository.findOneBy({ id: roomId });
    if (!room) {
      throw new NotFoundException(
        `Cinema Room with ID ${roomId} not found, or in maintenance`,
      );
    }

    const queryBuilder = this.sessionRepository.createQueryBuilder('session');

    queryBuilder
      .leftJoinAndSelect('session.movie', 'movie')
      .where('session.roomId = :roomId', { roomId })
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

  async update(
    id: number,
    cinemaRoom: Partial<CinemaRoom>,
  ): Promise<CinemaRoom> {
    await this.cinemaRoomRepository.update(id, cinemaRoom);
    const updatedCinemaRoom = await this.cinemaRoomRepository.findOneBy({ id });
    if (!updatedCinemaRoom) {
      throw new Error('Cinema room not found');
    }
    return updatedCinemaRoom;
  }

  async remove(id: number): Promise<void> {
    await this.cinemaRoomRepository.delete(id);
  }
}
