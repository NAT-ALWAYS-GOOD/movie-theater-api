import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateReservationDTO {
  @ApiProperty({
    example: 1,
    description: 'The id of the session',
  })
  @IsNumber()
  sessionId: number;

  @ApiProperty({
    example: 1,
    description: 'The id of the user',
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    example: [1, 2, 3],
    description: 'The ids of the seats reserved',
  })
  seats: number[];
}
