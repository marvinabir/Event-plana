import {Role} from "./role.enum"

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
  // role: 'ATTENDEE' | 'EVENT_MANAGER' | 'SUPER_ADMIN';
  createdAt: Date;
  updatedAt: Date;
  
}
export { Role };

