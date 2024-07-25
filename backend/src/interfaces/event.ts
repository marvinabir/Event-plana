import { Booking, Analytics } from '@prisma/client';
import { TicketType } from './ticketType';

export interface Event {
  id?: number;
  title: string;
  description: string;
  date: Date;
  time: Date;
  location: string;
  ticketTypes: TicketType[];
  image?: string|null;
  price: number;
  managerId: number;
  bookings?: Booking[];
  notifications?: Notification[];
  analytics?: Analytics[];
  createdAt: Date;
  updatedAt: Date;
}

