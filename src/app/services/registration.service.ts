import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private usersUrl = '/assets/mock-data/users.json';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.usersUrl);
  }

  addUser(newUser: any): Observable<any> {
    return this.getUsers().pipe(
      map((users: any[]) => {
        users.push(newUser); // Add the new user to the existing list
        return users;
      }),
      switchMap(updatedUsers => {
        // update the JSON file with the new data
        return this.http.put(this.usersUrl, updatedUsers).pipe(
          map(() => newUser) // Return the new user as an observable value
        );
      })
    );
  }
}
