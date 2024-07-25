import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:3000/profiles';

  constructor(private http: HttpClient) {}

  private getHttpOptions() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }

  /**
   * Get user profile by ID
   * @param id 
   * @returns Observable<UserProfile>
   */
  getUserProfile(id: number): Observable<UserProfile> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<UserProfile>(url, this.getHttpOptions());
  }

  /**
   * Update user profile
   * @param id 
   * @param data 
   * @returns Observable<UserProfile>
   */
  updateUserProfile(id: number, data: { name?: string; email?: string }): Observable<UserProfile> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<UserProfile>(url, data, this.getHttpOptions());
  }
  
}
