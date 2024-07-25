import { Event } from "../interfaces/Event";

export interface TicketType {
    id: number;
    type: string;
    price: number;
    availability: number;
    eventId: number;
    createdAt: Date;
    updatedAt: Date;
  }
  