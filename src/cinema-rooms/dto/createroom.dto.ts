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
    description: 'The capacity of the room, must be between 15 and 30',
    example: 25,
    minimum: 15,
    maximum: 30,
  })
  @IsInt()
  @Min(15)
  @Max(30)
  capacity: number;

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
    description: 'An array of images for the room',
    example: ['image1.jpg', 'image2.jpg'],
    required: false,
  })
  @IsString({ each: true })
  @IsOptional()
  images?: string[];
}
