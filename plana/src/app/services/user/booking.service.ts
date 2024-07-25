import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../../interfaces/Booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:3000/bookings';

  constructor(private http: HttpClient) {}

  private getUserId(): number | null {
    const userId = localStorage.getItem('userId');
    console.log('Retrieved userId:', userId);
    return userId ? parseInt(userId, 10) : null;
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  /**
   * Create a new booking
   * @param booking 
   * @returns Observable<Booking>
   */
  createBooking(booking: Omit<Booking, 'event' | 'id' | 'createdAt' | 'updatedAt'>): Observable<Booking> {
    const userId = this.getUserId();
    if (!userId) {
      throw new Error('User ID not found in local storage');
    }
    const bookingWithUser = { ...booking, userId };
    return this.http.post<Booking>(this.apiUrl, bookingWithUser, { headers: this.getAuthHeaders() });
  }

  /**
   * Get all bookings for a specific user
   * @param userId 
   * @returns Observable<Booking[]>
   */
  getBookingsByUserId(userId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/user/${userId}`, { headers: this.getAuthHeaders() });
  }

  /**
   * Change booking status for a specific user
   * @param userId 
   * @param status 
   * @returns Observable<void>
   */
  changeUserBookingStatus(userId: number, status: 'CONFIRMED' | 'CANCELLED'): Observable<void> {
    const url = `${this.apiUrl}/user/${userId}/status`;
    return this.http.put<void>(url, { status }, { headers: this.getAuthHeaders() });
  }
}





// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Booking } from '../../interfaces/Booking';

// @Injectable({
//   providedIn: 'root'
// })
// export class BookingService {
//   private apiUrl = 'http://localhost:3000/bookings';

//   constructor(private http: HttpClient) {}

//   private getUserId(): number | null {
//     const userId = localStorage.getItem('userId');
//     console.log('Retrieved userId:', userId);
//     return userId ? parseInt(userId, 10) : null;
//   }

//   private getAuthHeaders(): HttpHeaders {
//     const token = localStorage.getItem('token');
//     return new HttpHeaders({
//       'Authorization': `Bearer ${token}`
//     });
//   }

//   createBooking(booking: Booking): Observable<Booking> {
//     const userId = this.getUserId();
//     if (!userId) {
//       throw new Error('User ID not found in local storage');
//     }
//     const bookingWithUser = { ...booking, userId };
//     return this.http.post<Booking>(this.apiUrl, bookingWithUser, { headers: this.getAuthHeaders() });
//   }

//   getBookingsByUserId(userId: number): Observable<Booking[]> {
//     return this.http.get<Booking[]>(`${this.apiUrl}/user/${userId}`, { headers: this.getAuthHeaders() });
//   }

//   changeUserBookingStatus(userId: number, status: 'CONFIRMED' | 'CANCELLED'): Observable<void> {
//     const url = `${this.apiUrl}/user/${userId}/status`;
//     return this.http.put<void>(url, { status }, { headers: this.getAuthHeaders() });
//   }
// }
