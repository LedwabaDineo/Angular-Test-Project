import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../app/environments/environment';
import { PersonalDetails } from '../models/personal-details.model';

@Injectable({
  providedIn: 'root'
})
export class PersonalDetailsService {

  private apiUrl = environment.apiUrl + '/users';
  
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateUserDetails(updatedUser: PersonalDetails): Observable<any> {
    return this.http.put(this.apiUrl, updatedUser);
  }
}
