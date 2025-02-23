import { Session } from '../session.entity';
import { TheaterEntity } from '../../theater/theater.entity';

export class ReservationDTO {
  reference: string;
  createdAt: Date;
  qrCode: string;
  seats: number[];
  userId: number;
  session: Session;
  theaterEntity: TheaterEntity | null;
}
