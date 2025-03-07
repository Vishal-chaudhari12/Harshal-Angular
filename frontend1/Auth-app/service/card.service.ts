import { Injectable } from '@angular/core';
import { Product } from './product.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor() { }

  private cart: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>([]);

  getCart() {
    return this.cartSubject.asObservable(); // Observable to track cart updates
  }

  addToCart(product: Product) {
    this.cart.push(product);
    this.cartSubject.next(this.cart); // Notify subscribers
  }

  removeFromCart(productId: number) {
    this.cart = this.cart.filter(product => product.id !== productId);
    this.cartSubject.next(this.cart); // Update cart
  }
}
