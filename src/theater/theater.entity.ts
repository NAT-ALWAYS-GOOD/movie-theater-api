import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CinemaRoom } from '../cinema-rooms/cinema-room.entity';
import { User } from '../users/user.entity';

@Entity()
export class TheaterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  streetName: string;

  @Column()
  streetNumber: string;

  @Column()
  postalCode: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column('decimal', { precision: 9, scale: 6 })
  latitude: number;

  @Column('decimal', { precision: 9, scale: 6 })
  longitude: number;

  @OneToMany(() => CinemaRoom, (cinemaRoom) => cinemaRoom.theater)
  rooms: CinemaRoom[];

  @OneToMany(() => User, (user) => user.favoriteTheater)
  fans: User[];
}
