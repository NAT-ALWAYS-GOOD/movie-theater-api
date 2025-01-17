import { Module } from '@nestjs/common';
import { TheaterController } from './theater.controller';
import { TheaterService } from './theater.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TheaterEntity } from './theater.entity';
import { User } from '../users/user.entity';
import { Movie } from '../movie/movie.entity';
import { Session } from '../sessions/session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TheaterEntity, User, Movie, Session])],
  controllers: [TheaterController],
  providers: [TheaterService],
})
export class TheaterModule {}
