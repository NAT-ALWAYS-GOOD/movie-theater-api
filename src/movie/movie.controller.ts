import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie } from './movie.entity';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { ApiResponse } from '@nestjs/swagger';
import { Public } from '../decorators/public.decorator';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiResponse({
    status: 200,
    description: 'Movie has been created',
  })
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Post()
  create(@Body() movie: Movie) {
    return this.movieService.create(movie);
  }

  @ApiResponse({
    status: 200,
    description: 'Movie active status has been toggled',
  })
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Patch(':id/toggle-active')
  toggleActive(@Param('id') id: number) {
    return this.movieService.toggleActive(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Movies of the cinema',
  })
  @Public()
  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Movie asked',
  })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.movieService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Movie has been updated',
  })
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Put(':id')
  update(@Param('id') id: number, @Body() movie: Partial<Movie>) {
    return this.movieService.update(id, movie);
  }

  @ApiResponse({
    status: 200,
    description: 'Movie has been deleted',
  })
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.movieService.remove(id);
  }
}
