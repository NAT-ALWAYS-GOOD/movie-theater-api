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

@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Post()
  create(
    @Body()
    session: CreateSessionDto,
  ) {
    return this.sessionService.create(session);
  }

  @Get()
  findAll(@Query('movie') movieId?: number) {
    if (movieId) {
      return this.sessionService.findByMovieId(movieId);
    }
    return this.sessionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.sessionService.findOne(id);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Put(':id')
  update(@Param('id') id: number, @Body() session: Partial<Session>) {
    return this.sessionService.update(id, session);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.sessionService.remove(id);
  }
}
