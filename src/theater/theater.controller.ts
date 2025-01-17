import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateTheaterDTO } from './dto/createtheater.dto';
import { TheaterService } from './theater.service';
import { MovieSessionsGroup } from './theater.structs';

@Controller('theaters')
export class TheaterController {
  constructor(private readonly theaterService: TheaterService) {}

  @ApiOperation({
    summary: 'Get all movies which has session from theater',
    operationId: 'getAllMoviesSessionsFromTheater',
    tags: ['theaters'],
  })
  @ApiOkResponse({
    type: [MovieSessionsGroup],
    description: 'Liste des films et de leurs sessions pour un théâtre donné',
  })
  @Get(':id/movies-sessions')
  getAllMoviesSessionsFromTheater(@Param('id') theaterId: number) {
    return this.theaterService.getAllMoviesSessionsFromTheater(theaterId);
  }

  @ApiOperation({
    summary: 'Create theater',
    operationId: 'createTheater',
    tags: ['theaters'],
  })
  @ApiResponse({
    status: 200,
    description: 'Theater has been created',
  })
  @Post()
  create(@Body() theaterDTO: CreateTheaterDTO) {
    return this.theaterService.create(theaterDTO);
  }

  @ApiOperation({
    summary: 'Get all theaters',
    operationId: 'getAllTheaters',
    tags: ['theaters'],
  })
  @ApiResponse({
    status: 200,
    description: 'All theaters',
  })
  @Get()
  findAll() {
    return this.theaterService.findAll();
  }

  @ApiOperation({
    summary: 'Delete theater',
    operationId: 'deleteTheater',
    tags: ['theaters'],
  })
  @ApiResponse({
    status: 204,
    description: 'Theater deleted',
  })
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.theaterService.delete(id);
  }

  @ApiOperation({
    summary: 'Set favorite theater for user',
    operationId: 'setFavoriteTheaterForUser',
    tags: ['theaters'],
  })
  @ApiResponse({
    status: 200,
    description: 'Theater provided is now your favorite',
  })
  @Put('favorite/:id/user/:userId')
  favorite(@Param('id') id: number, @Param('userId') userId: number) {
    return this.theaterService.favorite(id, userId);
  }

  @ApiOperation({
    summary: 'Reset favorite theater for user',
    operationId: 'resetFavoriteTheaterOfUser',
    tags: ['theaters'],
  })
  @ApiResponse({
    status: 200,
    description: 'Favorite theater reset',
  })
  @Delete('favorite/:userId')
  resetFavorite(@Param('userId') userId: number) {
    return this.theaterService.resetFavorite(userId);
  }
}
