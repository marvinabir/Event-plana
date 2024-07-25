import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role, User } from '../../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {
  private apiUrl = 'http://localhost:3000/admin/users';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  /**
   * Get all users
   * @returns Observable<User[]>
   */
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

 

  /**
   * Get a single user by ID
   * @param id number
   * @returns Observable<User>
   */
  getSingleUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`, { headers: this.getAuthHeaders() });
  }

  /* Added delete user request */
  /**
   * Delete a user
   * @param userId number
   * @returns Observable<void>
   */
  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`, { headers: this.getAuthHeaders() });
  }


  /**
   * Update the role of a user
   * @param userId number
   * @param newRole Role
   * @returns Observable<User>
   */
  updateUserRole(userId: number, newRole: Role): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${userId}/role`, { role: newRole }, { headers: this.getAuthHeaders() });
  }
  
}
