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
import { CinemaRoomService } from './cinema-rooms.service';
import { CinemaRoom } from './cinema-room.entity';
import { CreateRoomDto } from './dto/createroom.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('cinema-rooms')
export class CinemaRoomController {
  constructor(private readonly cinemaRoomService: CinemaRoomService) {}

  @ApiOperation({
    summary: 'Create cinema room',
    operationId: 'createCinemaRoom',
    tags: ['cinema-rooms'],
  })
  @ApiResponse({
    status: 200,
    description: 'Cinema Room has been created',
  })
  @Post()
  create(@Body() cinemaRoom: CreateRoomDto) {
    return this.cinemaRoomService.create(cinemaRoom);
  }

  @ApiOperation({
    summary: 'Get all cinema rooms',
    operationId: 'getAllCinemaRooms',
    tags: ['cinema-rooms'],
  })
  @ApiResponse({
    status: 200,
    description: 'All cinema rooms',
  })
  @Get()
  findAll() {
    return this.cinemaRoomService.findAll();
  }

  @ApiOperation({
    summary: 'Get schedule of cinema room',
    operationId: 'getSchedule',
    tags: ['cinema-rooms'],
  })
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

  @ApiOperation({
    summary: 'Get cinema room by id',
    operationId: 'getCinemaRoomById',
    tags: ['cinema-rooms'],
  })
  @ApiResponse({
    status: 200,
    description: 'Cinema Room asked',
  })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.cinemaRoomService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update cinema room',
    operationId: 'updateCinemaRoom',
    tags: ['cinema-rooms'],
  })
  @ApiResponse({
    status: 200,
    description: 'Cinema Room has been updated',
  })
  @Put(':id')
  update(@Param('id') id: number, @Body() cinemaRoom: Partial<CinemaRoom>) {
    return this.cinemaRoomService.update(id, cinemaRoom);
  }

  @ApiOperation({
    summary: 'Delete cinema room',
    operationId: 'deleteCinemaRoom',
    tags: ['cinema-rooms'],
  })
  @ApiResponse({
    status: 200,
    description: 'Cinema Room has been deleted',
  })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.cinemaRoomService.remove(id);
  }
}
