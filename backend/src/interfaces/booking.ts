export interface Booking {
    id?: number;
    userId: number;
    eventId: number;
    ticketTypeId: number;
    status: 'CONFIRMED' | 'CANCELLED';
    createdAt?: Date;
    updatedAt?: Date;
  }
  