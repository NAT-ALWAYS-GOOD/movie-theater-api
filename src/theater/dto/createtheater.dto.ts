import {
  IsString,
  IsOptional,
  IsNumber,
  IsLatitude,
  IsLongitude,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTheaterDTO {
  @ApiProperty({
    description: 'The name of the theater',
    example: 'Cinema XYZ',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'A brief description of the theater',
    example: 'A modern cinema in the heart of the city.',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Street number of the theater',
    example: '10',
  })
  @IsString()
  streetNumber: string;

  @ApiProperty({
    description: 'Street name of the theater',
    example: 'Rue de la Paix',
  })
  @IsString()
  streetName: string;

  @ApiProperty({
    description: 'City where the theater is located',
    example: 'Paris',
  })
  @IsString()
  city: string;

  @ApiProperty({
    description: 'Postal code of the theater',
    example: '75002',
  })
  @IsString()
  postalCode: string;

  @ApiProperty({
    description: 'Country where the theater is located',
    example: 'France',
  })
  @IsString()
  country: string;

  @ApiProperty({
    description: 'Latitude coordinate of the theater',
    example: 48.8675,
  })
  @IsNumber()
  @IsLatitude()
  latitude: number;

  @ApiProperty({
    description: 'Longitude coordinate of the theater',
    example: 2.3292,
  })
  @IsNumber()
  @IsLongitude()
  longitude: number;
}
