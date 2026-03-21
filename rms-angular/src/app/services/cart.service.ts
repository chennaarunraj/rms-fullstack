import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems:any[] = [];

  private cartCount = new BehaviorSubject<number>(0);

  cartCount$ = this.cartCount.asObservable();

  addToCart(item:any){

    const existing = this.cartItems.find(i=>i.id===item.id);

    if(existing){
      existing.quantity += 1;
    }else{
      this.cartItems.push({...item,quantity:1});
    }

    this.updateCount();

  }

  increaseQuantity(item:any){

    item.quantity++;
    this.updateCount();

  }

  decreaseQuantity(item:any){

    if(item.quantity>1){
      item.quantity--;
    }else{
      this.removeItem(item);
    }

    this.updateCount();

  }

  removeItem(item:any){

    this.cartItems = this.cartItems.filter(i=>i.id!==item.id);
    this.updateCount();

  }

  getCartItems(){
    return this.cartItems;
  }

  updateCount(){

    const count = this.cartItems.reduce(
      (sum,item)=>sum + item.quantity,
      0
    );

    this.cartCount.next(count);

  }

  clearCart(){

    this.cartItems = [];
    this.cartCount.next(0);

  }

}