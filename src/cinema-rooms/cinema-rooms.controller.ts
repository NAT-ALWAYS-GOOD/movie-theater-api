import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CinemaRoomService } from './cinema-rooms.service';
import { CinemaRoom } from './cinema-room.entity';
import { CreateRoomDto } from './dto/createroom.dto';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';

@Controller('cinema-rooms')
export class CinemaRoomController {
  constructor(private readonly cinemaRoomService: CinemaRoomService) {}

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Post()
  create(@Body() cinemaRoom: CreateRoomDto) {
    return this.cinemaRoomService.create(cinemaRoom);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Patch(':id/toggle-maintenance')
  toggleMaintenance(@Param('id') id: number) {
    return this.cinemaRoomService.toggleMaintenance(id);
  }

  @Get()
  findAll() {
    return this.cinemaRoomService.findAll();
  }

  @Get(':id/schedule')
  getSchedule(
    @Param('id') id: number,
    @Query('start') start?: string,
    @Query('end') end?: string,
  ) {
    return this.cinemaRoomService.findSchedule(id, start, end);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.cinemaRoomService.findOne(id);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Put(':id')
  update(@Param('id') id: number, @Body() cinemaRoom: Partial<CinemaRoom>) {
    return this.cinemaRoomService.update(id, cinemaRoom);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.cinemaRoomService.remove(id);
  }
}
