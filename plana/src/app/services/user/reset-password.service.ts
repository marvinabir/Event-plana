import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  private apiUrl = 'http://localhost:3000/users/reset';

  constructor(private http: HttpClient) {}

  /**
   * Reset user's password
   * @param email 
   * @param newPassword 
   * @returns Observable<any>
   */
  resetPassword(email: string, newPassword: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const body = { email, newPassword };
    return this.http.post<any>(this.apiUrl, body, { headers });
  }
}
