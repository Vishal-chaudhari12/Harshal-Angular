import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel } from '../model/product';
import { Observable } from 'rxjs';
import { environment } from '../environment';

export interface Product2 {
  
  productName: string;
  productPrice: number;
  productImg: string;
  title:string;
  productDiscription:string;
  
}

@Injectable({
  providedIn: 'root'
})
export class Product2Service {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.API_URL + '/products'; 
  private apiUrl1=environment.API_URL + '/product';
  
    // Use async/await for fetching data
    async getProducts(): Promise<Product2[]> {
      try {
        const response = await this.http.get<Product2[]>(this.apiUrl).toPromise();
        return response ?? []; 
      } catch (error) {
        console.error('Error fetching products', error);
        return []; 
      }
    }

    saveProduct(obj : ProductModel):Observable<any>{
     return this.http.post<any>(this.apiUrl1,obj)
    }

}
