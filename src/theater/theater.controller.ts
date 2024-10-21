import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CreateTheaterDTO } from './dto/createtheater.dto';
import { TheaterService } from './theater.service';

@Controller('theaters')
export class TheaterController {
  constructor(private readonly theaterService: TheaterService) {}

  @ApiResponse({
    status: 200,
    description: 'Theater has been created',
  })
  @Post()
  create(@Body() theaterDTO: CreateTheaterDTO) {
    return this.theaterService.create(theaterDTO);
  }

  @ApiResponse({
    status: 200,
    description: 'All theaters',
  })
  @Get()
  findAll() {
    return this.theaterService.findAll();
  }

  @ApiResponse({
    status: 204,
    description: 'Theater deleted',
  })
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.theaterService.delete(id);
  }
}
