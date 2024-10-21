import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  create(movie: Movie): Promise<Movie> {
    return this.movieRepository.save(movie);
  }

  findAll(): Promise<Movie[]> {
    return this.movieRepository.find({ where: { isActive: true } });
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
