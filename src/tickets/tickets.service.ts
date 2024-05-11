import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Ticket } from './ticket.entity';
import { SuperTicket } from './superticket.entity';
import { SuperTicketUsage } from './superticketusage.entity';
import { Session } from '../sessions/session.entity';
import { User } from '../users/user.entity';
import { Transaction, TransactionType } from '../account/transaction.entity';
import { Account } from '../account/account.entity';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
    @InjectRepository(SuperTicket)
    private superTicketRepository: Repository<SuperTicket>,
    @InjectRepository(SuperTicketUsage)
    private superTicketUsageRepository: Repository<SuperTicketUsage>,
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async createTicket(userId: number, sessionId: number): Promise<Ticket> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    const session = await this.sessionRepository.findOneBy({ id: sessionId });
    if (!session) {
      throw new NotFoundException('Session does not exist');
    }
    const ticket = this.ticketRepository.create({
      user: user,
      session: session,
      used: false,
    });
    return this.ticketRepository.save(ticket);
  }

  async useTicket(ticketId: number): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({
      where: { id: ticketId },
      relations: ['session', 'user'],
    });
    if (!ticket || ticket.used) {
      throw new ConflictException('Ticket is already used or does not exist');
    }
    ticket.used = true;
    return this.ticketRepository.save(ticket);
  }

  async createSuperTicket(userId: number): Promise<SuperTicket> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    const superTicket = this.superTicketRepository.create({
      user,
      remainingUses: 10,
    });
    return this.superTicketRepository.save(superTicket);
  }

  async useSuperTicket(
    superTicketId: number,
    sessionId: number,
  ): Promise<SuperTicketUsage> {
    const superTicket = await this.superTicketRepository.findOneBy({
      id: superTicketId,
    });
    if (!superTicket || superTicket.remainingUses <= 0) {
      throw new NotFoundException('SuperTicket is exhausted or does not exist');
    }

    const session = await this.sessionRepository.findOneBy({ id: sessionId });
    if (!session) {
      throw new NotFoundException('Session does not exist');
    }

    const usage = this.superTicketUsageRepository.create({
      superTicket,
      session,
      usedAt: new Date(),
    });
    await this.superTicketUsageRepository.save(usage);

    superTicket.remainingUses -= 1;
    await this.superTicketRepository.save(superTicket);

    usage.superTicket = superTicket;
    return usage;
  }

  async purchaseTicket(userId: number, sessionId: number): Promise<Ticket> {
    const ticketPrice = 10;

    const userAccount = await this.accountRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!userAccount || userAccount.balance < ticketPrice) {
      throw new NotFoundException(
        'Insufficient funds or account does not exist',
      );
    }
    userAccount.balance -= ticketPrice;
    await this.accountRepository.save(userAccount);

    const transaction = this.transactionRepository.create({
      account: userAccount,
      type: TransactionType.PURCHASE,
      amount: ticketPrice,
    });
    await this.transactionRepository.save(transaction);

    return this.createTicket(userId, sessionId);
  }

  async purchaseSuperTicket(userId: number): Promise<SuperTicket> {
    const superTicketPrice = 80;

    const userAccount = await this.accountRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!userAccount || userAccount.balance < superTicketPrice) {
      throw new NotFoundException(
        'Insufficient funds or account does not exist',
      );
    }
    userAccount.balance -= superTicketPrice;
    await this.accountRepository.save(userAccount);

    const transaction = this.transactionRepository.create({
      account: userAccount,
      type: TransactionType.PURCHASE,
      amount: superTicketPrice,
    });
    await this.transactionRepository.save(transaction);

    return this.createSuperTicket(userId);
  }

  async findAllUsedTicketsByUser(userId: number): Promise<any[]> {
    const tickets = await this.ticketRepository.find({
      where: { user: { id: userId }, used: true },
      relations: ['session'],
    });

    const superTicketUsages = await this.superTicketUsageRepository.find({
      where: { superTicket: { user: { id: userId } } },
      relations: ['session', 'superTicket', 'session.movie'],
    });

    const combinedTickets = tickets.map((ticket) => ({
      type: 'Standard Ticket',
      sessionId: ticket.session.id,
      sessionStartTime: ticket.session.startTime,
      sessionEndTime: ticket.session.endTime,
      movie: ticket.session.movie,
    }));

    console.log(superTicketUsages);

    const combinedSuperTickets = superTicketUsages.map((usage) => ({
      type: 'Super Ticket',
      sessionId: usage.session.id,
      sessionStartTime: usage.session.startTime,
      sessionEndTime: usage.session.endTime,
      movie: usage.session.movie,
      remainingUses: usage.superTicket.remainingUses,
    }));

    return [...combinedTickets, ...combinedSuperTickets];
  }

  async countPersonsRegisteredForSession(sessionId: number): Promise<number> {
    const numbersForSingleTicket = await this.ticketRepository.count({
      where: { session: { id: sessionId } },
    });

    return numbersForSingleTicket;
  }

  async countPersonsPresentForSession(sessionId: number): Promise<number> {
    const numbersForSingleTicket = await this.ticketRepository.count({
      where: { session: { id: sessionId }, used: true },
    });

    const numbersForSuperTicket = await this.superTicketUsageRepository.count({
      where: { session: { id: sessionId } },
    });

    return numbersForSingleTicket + numbersForSuperTicket;
  }

  async getTicketsForSession(sessionId: number) {
    const singleTickets = await this.ticketRepository.find({
      where: { session: { id: sessionId } },
      relations: ['user'],
    });

    const combinedTickets = singleTickets.map((ticket) => ({
      type: 'Standard Ticket',
      ticketId: ticket.id,
      user: ticket.user.username,
      used: ticket.used,
    }));

    const superTickets = await this.superTicketRepository.find({
      where: { usages: { session: { id: sessionId } } },
      relations: ['user'],
    });

    const combinedSuperTickets = superTickets.map((ticket) => ({
      type: 'Super Ticket',
      superTicketId: ticket.id,
      user: ticket.user.username,
      used: true,
    }));

    return [...combinedTickets, ...combinedSuperTickets];
  }
}
