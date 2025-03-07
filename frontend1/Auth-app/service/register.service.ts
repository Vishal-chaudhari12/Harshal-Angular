import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../user.model';
import { environment } from '../environment';


@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiUrl = environment.API_URL + '/register';

  constructor(private http: HttpClient) {}

  registerUser(user: User): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }
}
