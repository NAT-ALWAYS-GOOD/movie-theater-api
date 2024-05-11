import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionService } from './sessions.service';
import { SessionController } from './sessions.controller';
import { Session } from './session.entity';
import { CinemaRoom } from '../cinema-rooms/cinema-room.entity';
import { Movie } from '../movie/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Session, CinemaRoom, Movie])],
  providers: [SessionService],
  controllers: [SessionController],
})
export class SessionModule {}
