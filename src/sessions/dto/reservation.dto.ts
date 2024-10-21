import { Session } from '../session.entity';

export class ReservationDTO {
  reference: string;
  qrCode: string;
  seats: number[];
  user: string;
  session: Session;
}
