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

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Post()
  create(@Body() movie: Movie) {
    return this.movieService.create(movie);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Patch(':id/toggle-active')
  toggleMaintenance(@Param('id') id: number) {
    return this.movieService.toggleActive(id);
  }

  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.movieService.findOne(id);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Put(':id')
  update(@Param('id') id: number, @Body() movie: Partial<Movie>) {
    return this.movieService.update(id, movie);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.movieService.remove(id);
  }
}
