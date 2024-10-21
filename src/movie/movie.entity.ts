import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Session } from '../sessions/session.entity'; // Assurez-vous que le chemin est correct

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  duration: number;

  @Column()
  releaseDate: Date;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Session, (session) => session.movie)
  sessions: Session[];
}
