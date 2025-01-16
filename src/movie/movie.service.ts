import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { CreateMovieDTO } from './dto/createmovie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async create(movie: CreateMovieDTO): Promise<Movie> {
    return await this.movieRepository.save(movie);
  }

  async findAll(released?: boolean | undefined): Promise<Movie[]> {
    const result = await this.movieRepository.find({
      where: { isActive: true },
    });
    if (released === false) {
      return result.filter((movie) => movie.releaseDate > new Date());
    }

    if (released === true) {
      return result.filter((movie) => movie.releaseDate <= new Date());
    }

    return result;
  }

  async findOne(id: number): Promise<Movie> {
    const movie = await this.movieRepository.findOneBy({ id });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    return movie;
  }

  async update(id: number, movie: Partial<Movie>): Promise<Movie> {
    await this.movieRepository.update(id, movie);
    const updatedMovie = await this.movieRepository.findOneBy({ id });
    if (!updatedMovie) {
      throw new NotFoundException('Movie not found');
    }
    return updatedMovie;
  }

  async toggleActive(movieId: number): Promise<Movie> {
    const movie = await this.movieRepository.findOneBy({ id: movieId });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${movieId} not found`);
    }
    movie.isActive = !movie.isActive;
    return this.movieRepository.save(movie);
  }

  async remove(id: number): Promise<void> {
    const movie = await this.movieRepository.findOneBy({ id });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    await this.movieRepository.delete(id);
  }
}
