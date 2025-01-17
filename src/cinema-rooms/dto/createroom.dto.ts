import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {
  @ApiProperty({
    description: 'The name of the cinema room',
    example: 'Room 1',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'A brief description of the room',
    example: 'This room is equipped with the latest 3D technology.',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Indicates if the room has access for disabled people',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  accessibility?: boolean;

  @ApiProperty({
    description: 'Type of the room, like IMAX, 3D, etc.',
    example: 'IMAX',
  })
  @IsString()
  type: string;

  @ApiProperty({
    description: 'The theater id where the room is located',
    example: 1,
  })
  @IsInt()
  theaterId: number;
}
