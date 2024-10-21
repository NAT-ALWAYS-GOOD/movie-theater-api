import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TheaterEntity } from './theater.entity';
import { CreateTheaterDTO } from './dto/createtheater.dto';
import { User } from '../users/user.entity';

@Injectable()
export class TheaterService {
  constructor(
    @InjectRepository(TheaterEntity)
    private theaterRepository: Repository<TheaterEntity>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
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
}
