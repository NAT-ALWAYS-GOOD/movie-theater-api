import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './movie/movie.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Movie } from './movie/movie.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SessionModule } from './sessions/sessions.module';
import { CinemaRoomModule } from './cinema-rooms/cinema-rooms.module';
import { UsersModule } from './users/users.module';
import { Session } from './sessions/session.entity';
import { CinemaRoom } from './cinema-rooms/cinema-room.entity';
import { User } from './users/user.entity';
import { JwtAuthGuard } from './guards/jwt.guard';
import { APP_GUARD } from '@nestjs/core';
import { SeatEntity } from './sessions/seat.entity';
import { TheaterModule } from './theater/theater.module';
import { TheaterEntity } from './theater/theater.entity';
import { ReservationEntity } from './sessions/reservation.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        timezone: 'Z',
        host: config.get('MYSQL_HOST'),
        port: +config.get('MYSQL_PORT'), // Le "+" convertit le port en nombre
        username: config.get('MYSQL_USER'),
        password: config.get('MYSQL_PASSWORD'),
        database: config.get('MYSQL_DATABASE'),
        entities: [
          Movie,
          Session,
          CinemaRoom,
          User,
          SeatEntity,
          TheaterEntity,
          ReservationEntity,
        ],
        synchronize: true,
      }),
    }),
    MovieModule,
    SessionModule,
    CinemaRoomModule,
    UsersModule,
    TheaterModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
