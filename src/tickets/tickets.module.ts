import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from '../sessions/session.entity';
import { SuperTicket } from './superticket.entity';
import { Ticket } from './ticket.entity';
import { SuperTicketUsage } from './superticketusage.entity';
import { TicketController } from './tickets.controller';
import { TicketService } from './tickets.service';
import { User } from '../users/user.entity';
import { Account } from '../account/account.entity';
import { Transaction } from '../account/transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Ticket,
      SuperTicket,
      SuperTicketUsage,
      Session,
      User,
      Account,
      Transaction,
    ]),
  ],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
