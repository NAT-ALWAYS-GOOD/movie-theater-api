import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateSessionDto {
  @ApiProperty({
    example: 1,
    description: 'The id of the movie',
  })
  @IsNumber()
  movieId: number;

  @ApiProperty({
    example: 1,
    description: 'The id of the room',
  })
  @IsNumber()
  roomId: number;

  @ApiProperty({
    example: new Date(),
    description: 'The start time of the session',
  })
  startTime: Date;
}
