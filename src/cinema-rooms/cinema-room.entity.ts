import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Session } from '../sessions/session.entity'; // Assurez-vous que le chemin est correct

@Entity()
export class CinemaRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('simple-array')
  images: string[];

  @Column()
  type: string;

  @Column()
  capacity: number;

  @Column({ default: false })
  accessibility: boolean;

  @Column({ default: false })
  inMaintenance: boolean;

  @OneToMany(() => Session, (session) => session.room)
  sessions: Session[];
}
