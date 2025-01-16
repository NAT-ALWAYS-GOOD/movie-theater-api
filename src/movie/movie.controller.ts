import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put, Query,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie } from './movie.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from '../decorators/public.decorator';
import { CreateMovieDTO } from './dto/createmovie.dto';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiOperation({
    summary: 'Create movie',
    operationId: 'createMovie',
    tags: ['movies'],
  })
  @ApiResponse({
    status: 200,
    description: 'Movie has been created',
  })
  @Post()
  create(@Body() movie: CreateMovieDTO) {
    return this.movieService.create(movie);
  }

  @ApiOperation({
    summary: 'Toggle movie active status',
    operationId: 'toggleMovieActive',
    tags: ['movies'],
  })
  @ApiResponse({
    status: 200,
    description: 'Movie active status has been toggled',
  })
  @Patch(':id/toggle-active')
  toggleActive(@Param('id') id: number) {
    return this.movieService.toggleActive(id);
  }

  @ApiOperation({
    summary: 'Get all movies',
    operationId: 'getAllMovies',
    tags: ['movies'],
  })
  @ApiResponse({
    status: 200,
    description: 'Movies of the cinema',
  })
  @Public()
  @Get()
  findAll(@Query('released') released?: string) {
    const parsedReleased =
      released === 'true' ? true : released === 'false' ? false : undefined;
    return this.movieService.findAll(parsedReleased);
  }

  @ApiOperation({
    summary: 'Get movie by id',
    operationId: 'getMovieById',
    tags: ['movies'],
  })
  @ApiResponse({
    status: 200,
    description: 'Movie asked',
  })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.movieService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update movie',
    operationId: 'updateMovie',
    tags: ['movies'],
  })
  @ApiResponse({
    status: 200,
    description: 'Movie has been updated',
  })
  @Put(':id')
  update(@Param('id') id: number, @Body() movie: Partial<Movie>) {
    return this.movieService.update(id, movie);
  }

  @ApiOperation({
    summary: 'Delete movie',
    operationId: 'deleteMovie',
    tags: ['movies'],
  })
  @ApiResponse({
    status: 200,
    description: 'Movie has been deleted',
  })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.movieService.remove(id);
  }
}
