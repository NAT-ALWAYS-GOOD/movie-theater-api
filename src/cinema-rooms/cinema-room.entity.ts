import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Session } from '../sessions/session.entity';
import { TheaterEntity } from '../theater/theater.entity'; // Assurez-vous que le chemin est correct

@Entity()
export class CinemaRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  type: string;

  @Column({ default: 50 })
  capacity: number;

  @Column({ default: false })
  accessibility: boolean;

  @OneToMany(() => Session, (session) => session.room)
  sessions: Session[];

  @OneToOne(() => TheaterEntity, (theater: TheaterEntity) => theater.rooms)
  theater: TheaterEntity;
}
