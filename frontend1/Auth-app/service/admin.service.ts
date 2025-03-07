import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminModel } from '../model/admin';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  saveAdmin(adminObj: AdminModel) {
    throw new Error('Method not implemented.');
  }

   constructor(private http: HttpClient) { }
  
    private apiUrl = environment.API_URL + '/admin'; 
    
  
      saveAdmin1(obj : AdminModel):Observable<any>{
       return this.http.post<any>(this.apiUrl,obj)
      }
  
}
