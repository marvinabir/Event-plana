import { TicketType } from '../interfaces/TicketType';
import { Booking} from '../interfaces/Booking';
import { Analytics } from './Analytics';

export interface Event {
  id: number;
  title: string;
  description: string;
  date: Date;
  time: Date;
  location: string;
  ticketTypes?: TicketType[];
  image?: string|null;
  price: number;
  managerId: number;
  bookings?: Booking[];
  notifications?: Notification[];
  analytics?: Analytics[];
  createdAt?: Date;
  updatedAt?: Date;
}