import { Module } from '@nestjs/common';
import { TheaterController } from './theater.controller';
import { TheaterService } from './theater.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TheaterEntity } from './theater.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TheaterEntity])],
  controllers: [TheaterController],
  providers: [TheaterService],
})
export class TheaterModule {}
