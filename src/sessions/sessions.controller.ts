import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { SessionService } from './sessions.service';
import { Session } from './session.entity';
import { CreateSessionDto } from './dto/createsession.dto';
import { ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from '../decorators/public.decorator';
import { CreateReservationDTO } from './dto/createreservation.dto';
import { MovieSessionsGroup } from '../theater/theater.structs';

@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @ApiOperation({
    summary: 'Create session',
    operationId: 'createSession',
    tags: ['sessions'],
  })
  @ApiResponse({
    status: 200,
    description: 'Session has been created',
  })
  @Post()
  create(
    @Body()
    session: CreateSessionDto,
  ) {
    return this.sessionService.create(session);
  }

  @ApiOperation({
    summary: 'Get all sessions',
    operationId: 'getAllSessions',
    tags: ['sessions'],
  })
  @ApiResponse({
    status: 200,
    description:
      'All sessions based on potential movieId, startDate and endDate',
  })
  @Public()
  @Get()
  findAll(
    @Query('movie') movieId?: number,
    @Query('start') start?: string,
    @Query('end') end?: string,
  ) {
    if (movieId) {
      return this.sessionService.findByMovieId(movieId, start, end);
    }
    return this.sessionService.findAll(start, end);
  }

  @ApiOperation({
    summary: 'Get session by id',
    operationId: 'getSessionById',
    tags: ['sessions'],
  })
  @ApiResponse({
    status: 200,
    description: 'Session with id provided',
  })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.sessionService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update session',
    operationId: 'updateSession',
    tags: ['sessions'],
  })
  @ApiResponse({
    status: 200,
    description: 'Session has been updated',
  })
  @Put(':id')
  update(@Param('id') id: number, @Body() session: Partial<Session>) {
    return this.sessionService.update(id, session);
  }

  @ApiOperation({
    summary: 'Delete session',
    operationId: 'deleteSession',
    tags: ['sessions'],
  })
  @ApiResponse({
    status: 200,
    description: 'Session has been deleted',
  })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.sessionService.remove(id);
  }

  @ApiOperation({
    summary: 'Create reservation for user',
    operationId: 'createReservationForUser',
    tags: ['reservations'],
  })
  @ApiResponse({
    status: 200,
    description: 'Reservation has been created',
  })
  @Post('reservation')
  createReservation(@Body() reservation: CreateReservationDTO) {
    return this.sessionService.createReservation(reservation);
  }

  @ApiOperation({
    summary: 'Get all reservations of user',
    operationId: 'getAllReservationsOfUser',
    tags: ['reservations'],
  })
  @ApiResponse({
    status: 200,
    description: 'Reservations of user',
  })
  @Get('reservation/user/:userId')
  getReservationsOfUser(@Param('userId') userId: number) {
    return this.sessionService.getReservationsOfUser(userId);
  }

  @ApiOperation({
    summary: 'Get all sessions of a movie and theater',
    operationId: 'getAllSessionsFromMovieIdAndTheaterId',
    tags: ['sessions'],
  })
  @ApiResponse({
    status: 200,
    description: 'Liste des sessions pour un théâtre et un film donné',
  })
  @Get('/movie/:movieId/theater/:theaterId')
  getAllSessionsFromMovieIdAndTheaterId(
    @Param('movieId') movieId: number,
    @Param('theaterId') theaterId: number,
  ) {
    return this.sessionService.getAllSessionsFromMovieIdAndTheaterId(
      movieId,
      theaterId,
    );
  }
}
