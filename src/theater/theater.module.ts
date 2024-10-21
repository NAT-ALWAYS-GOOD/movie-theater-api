import { Module } from '@nestjs/common';
import { TheaterController } from './theater.controller';
import { TheaterService } from './theater.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TheaterEntity } from './theater.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TheaterEntity, User])],
  controllers: [TheaterController],
  providers: [TheaterService],
})
export class TheaterModule {}
