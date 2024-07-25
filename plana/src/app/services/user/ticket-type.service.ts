import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TicketType } from '../../interfaces/TicketType';

@Injectable({
  providedIn: 'root'
})
export class TicketTypeService {
  private apiUrl = 'http://localhost:3000/ticketTypes';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getAllTicketTypes(): Observable<TicketType[]> {
    return this.http.get<TicketType[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getTicketTypeById(id: number): Observable<TicketType> {
    return this.http.get<TicketType>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  createTicketType(ticketType: Omit<TicketType, 'id' | 'createdAt' | 'updatedAt'>): Observable<TicketType> {
    return this.http.post<TicketType>(this.apiUrl, ticketType, { headers: this.getAuthHeaders() });
  }

  getTicketTypesByEventId(eventId: number): Observable<TicketType[]> {
    return this.http.get<TicketType[]>(`${this.apiUrl}/event/${eventId}`, { headers: this.getAuthHeaders() });
  }
}
