import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor() {
   
    this.loggedIn.next(!!localStorage.getItem('loginUser'));
  }

  login() {
    this.loggedIn.next(true); 
  }

  logout() {
    localStorage.removeItem('loginUser'); 
    this.loggedIn.next(false); 
  }
}
