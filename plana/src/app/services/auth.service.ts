import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private userId = 'userId';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        console.log(response);
        localStorage.setItem(this.userId, response.id)
        return response;
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  
}


// import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';
// import { Router } from '@angular/router';
// import { isPlatformBrowser } from '@angular/common';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private apiUrl = 'http://localhost:3000/users';
//   private userIdKey = 'userId';
//   private tokenKey = 'token';
//   private roleKey = 'role';

//   constructor(
//     private http: HttpClient,
//     private router: Router,
//     @Inject(PLATFORM_ID) private platformId: Object
//   ) {}

//   private isBrowser(): boolean {
//     return isPlatformBrowser(this.platformId);
//   }

//   login(email: string, password: string): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
//       tap(response => {
//         if (this.isBrowser()) {
//           console.log(response);
//           localStorage.setItem(this.userIdKey, response.id);
//           localStorage.setItem(this.tokenKey, response.token); // Assuming the token is also received
//           localStorage.setItem(this.roleKey, response.role); // Assuming the role is also received
//         }
//         return response;
//       })
//     );
//   }

//   logout() {
//     if (this.isBrowser()) {
//       localStorage.removeItem(this.tokenKey);
//       localStorage.removeItem(this.roleKey);
//     }
//     this.router.navigate(['/login']);
//   }

//   getRole(): string | null {
//     if (this.isBrowser()) {
//       return localStorage.getItem(this.roleKey);
//     }
//     return null;
//   }

//   isLoggedIn(): boolean {
//     if (this.isBrowser()) {
//       return !!localStorage.getItem(this.tokenKey);
//     }
//     return false;
//   }
// }



 


