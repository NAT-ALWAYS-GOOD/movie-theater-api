import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CinemaRoomService } from './cinema-rooms.service';
import { CinemaRoomController } from './cinema-rooms.controller';
import { CinemaRoom } from './cinema-room.entity';
import { Session } from '../sessions/session.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CinemaRoom]),
    TypeOrmModule.forFeature([Session]),
  ],
  providers: [CinemaRoomService],
  controllers: [CinemaRoomController],
})
export class CinemaRoomModule {}
