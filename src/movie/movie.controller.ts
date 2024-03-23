import { Controller, Get } from '@nestjs/common';

@Controller('movie')
export class MovieController {
  @Get()
  getMovies() {
    return 'All movies';
  }
}
