import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Session } from '../sessions/session.entity';

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

  @Column({ default: 'dQw4w9WgXcQ' })
  trailerYoutubeId: string;

  @OneToMany(() => Session, (session) => session.movie)
  sessions: Session[];
}
