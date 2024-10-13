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
import { TicketModule } from './tickets/tickets.module';
import { Ticket } from './tickets/ticket.entity';
import { SuperTicket } from './tickets/superticket.entity';
import { SuperTicketUsage } from './tickets/superticketusage.entity';
import { AccountModule } from './account/account.module';
import { Account } from './account/account.entity';
import { Transaction } from './account/transaction.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Rend le module disponible globalement
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
          Ticket,
          SuperTicket,
          SuperTicketUsage,
          Account,
          Transaction,
        ],
        synchronize: false,
      }),
    }),
    MovieModule,
    SessionModule,
    CinemaRoomModule,
    UsersModule,
    TicketModule,
    AccountModule,
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
