import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionService } from './sessions.service';
import { SessionController } from './sessions.controller';
import { Session } from './session.entity';
import { CinemaRoom } from '../cinema-rooms/cinema-room.entity';
import { Movie } from '../movie/movie.entity';
import { ReservationEntity } from './reservation.entity';
import { SeatEntity } from './seat.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Session,
      CinemaRoom,
      Movie,
      ReservationEntity,
      SeatEntity,
      User,
    ]),
  ],
  providers: [SessionService],
  controllers: [SessionController],
})
export class SessionModule {}
