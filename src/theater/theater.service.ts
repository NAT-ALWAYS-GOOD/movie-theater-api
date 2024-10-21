import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TheaterEntity } from './theater.entity';
import { CreateTheaterDTO } from './dto/createtheater.dto';

@Injectable()
export class TheaterService {
  constructor(
    @InjectRepository(TheaterEntity)
    private theaterRepository: Repository<TheaterEntity>,
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
}
