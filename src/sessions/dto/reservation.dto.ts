import { Session } from '../session.entity';

export class ReservationDTO {
  reference: string;
  createdAt: Date;
  qrCode: string;
  seats: number[];
  user: string;
  session: Session;
}
