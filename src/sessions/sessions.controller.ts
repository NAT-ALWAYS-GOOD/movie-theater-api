import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SessionService } from './sessions.service';
import { Session } from './session.entity';
import { CreateSessionDto } from './dto/createsession.dto';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { ApiResponse } from '@nestjs/swagger';
import { Public } from '../decorators/public.decorator';

@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @ApiResponse({
    status: 200,
    description: 'Session has been created',
  })
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Post()
  create(
    @Body()
    session: CreateSessionDto,
  ) {
    return this.sessionService.create(session);
  }

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

  @ApiResponse({
    status: 200,
    description: 'Session with id provided',
  })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.sessionService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Session has been updated',
  })
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Put(':id')
  update(@Param('id') id: number, @Body() session: Partial<Session>) {
    return this.sessionService.update(id, session);
  }

  @ApiResponse({
    status: 200,
    description: 'Session has been deleted',
  })
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.sessionService.remove(id);
  }
}
