import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateMovieDTO {
  @ApiProperty({
    example: 'Batman',
    description: 'The name of the movie',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example:
      'The Dark Knight, Batman, the vigilante of Gotham City, goes on a brutal war against the Joker, a criminal mastermind who terrorizes the city.',
    description: 'The description of the movie / synopsys',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 1,
    description: 'Time in minutes',
  })
  @IsNumber()
  duration: number;

  @ApiProperty({
    example: new Date(),
    description: 'The release date of the movie',
  })
  @IsDateString()
  releaseDate: Date;

  @ApiProperty({
    example: 'https://www.google.com',
    description: 'The URL of the movie poster',
  })
  @IsString()
  imageUrl: string;
}
