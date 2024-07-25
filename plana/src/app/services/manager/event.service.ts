import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../../interfaces/Event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:3000/events';

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

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getEventById(eventId: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${eventId}`, { headers: this.getAuthHeaders() });
  }

  // createEvent(event: Event): Observable<Event> { 
  //   const eventManager = { ...event,managerId:this.userId}
  //   return this.http.post<Event>(this.apiUrl, event, { headers: this.getAuthHeaders() });
  // }

  createEvent(event: Event): Observable<Event> { 
    const userId = this.getUserId();
    if (!userId) {
      throw new Error('User ID not found in local storage');
    }
    const eventManager = { ...event, managerId: userId };
    return this.http.post<Event>(this.apiUrl, eventManager, { headers: this.getAuthHeaders() });
  }


  updateEvent(eventId: number, event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/${eventId}`, event, { headers: this.getAuthHeaders() });
  }

  deleteEvent(eventId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${eventId}`, { headers: this.getAuthHeaders() });
  }
}


// import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Event } from '../../interfaces/Event';
// import { isPlatformBrowser } from '@angular/common';

// @Injectable({
//   providedIn: 'root'
// })
// export class EventService {
//   private apiUrl = 'http://localhost:3000/events';

//   constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

//   private isBrowser(): boolean {
//     return isPlatformBrowser(this.platformId);
//   }

//   private getUserId(): number | null {
//     if (this.isBrowser()) {
//       const userId = localStorage.getItem('userId');
//       console.log('Retrieved userId:', userId);
//       return userId ? parseInt(userId, 10) : null;
//     }
//     return null;
//   }

//   private getAuthHeaders(): HttpHeaders {
//     let headers = new HttpHeaders();
//     if (this.isBrowser()) {
//       const token = localStorage.getItem('token');
//       if (token) {
//         headers = headers.set('Authorization', `Bearer ${token}`);
//       }
//     }
//     return headers;
//   }

//   getAllEvents(): Observable<Event[]> {
//     return this.http.get<Event[]>(this.apiUrl, { headers: this.getAuthHeaders() });
//   }

//   getEventById(eventId: number): Observable<Event> {
//     return this.http.get<Event>(`${this.apiUrl}/${eventId}`, { headers: this.getAuthHeaders() });
//   }

//   createEvent(event: Event): Observable<Event> { 
//     const userId = this.getUserId();
//     if (!userId) {
//       throw new Error('User ID not found in local storage');
//     }
//     const eventManager = { ...event, managerId: userId };
//     return this.http.post<Event>(this.apiUrl, eventManager, { headers: this.getAuthHeaders() });
//   }

//   updateEvent(eventId: number, event: Event): Observable<Event> {
//     return this.http.put<Event>(`${this.apiUrl}/${eventId}`, event, { headers: this.getAuthHeaders() });
//   }

//   deleteEvent(eventId: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/${eventId}`, { headers: this.getAuthHeaders() });
//   }
// }
