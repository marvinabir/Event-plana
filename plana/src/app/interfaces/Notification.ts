export interface Notification {
    id: number;
    userId: number;
    eventId?: number;
    message: string;
    createdAt: Date;
    updatedAt: Date;
  }
  