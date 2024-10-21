import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CinemaRoomService } from './cinema-rooms.service';
import { CinemaRoom } from './cinema-room.entity';
import { CreateRoomDto } from './dto/createroom.dto';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { ApiResponse } from '@nestjs/swagger';

@Controller('cinema-rooms')
export class CinemaRoomController {
  constructor(private readonly cinemaRoomService: CinemaRoomService) {}

  @ApiResponse({
    status: 200,
    description: 'Cinema Room has been created',
  })
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Post()
  create(@Body() cinemaRoom: CreateRoomDto) {
    return this.cinemaRoomService.create(cinemaRoom);
  }

  @ApiResponse({
    status: 200,
    description: 'All cinema rooms',
  })
  @Get()
  findAll() {
    return this.cinemaRoomService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Schedule of specific cinema room with start and end date',
  })
  @Get(':id/schedule')
  getSchedule(
    @Param('id') id: number,
    @Query('start') start?: string,
    @Query('end') end?: string,
  ) {
    return this.cinemaRoomService.findSchedule(id, start, end);
  }

  @ApiResponse({
    status: 200,
    description: 'Cinema Room asked',
  })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.cinemaRoomService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Cinema Room has been updated',
  })
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Put(':id')
  update(@Param('id') id: number, @Body() cinemaRoom: Partial<CinemaRoom>) {
    return this.cinemaRoomService.update(id, cinemaRoom);
  }

  @ApiResponse({
    status: 200,
    description: 'Cinema Room has been deleted',
  })
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.cinemaRoomService.remove(id);
  }
}
