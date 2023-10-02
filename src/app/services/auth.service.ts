import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersUrl = '../../assets/mock-data/users.json';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(this.usersUrl).pipe(
      map((users) => {
        const user = users.find((u) => u.username === username && u.password === password);
        if (user) {
        console.log(user)
          localStorage.setItem('currentUser', JSON.stringify(user));
          return true;
        } else {
          return false;
        }
      })
    );
  }

  getCurrentUser(): any {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : {};
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

}
