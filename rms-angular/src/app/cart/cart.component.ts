import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cartItems:any[] = [];
  total:number = 0;

  constructor(
    private cartService: CartService,
    private toastr: ToastrService
  ){

    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();

  }

  calculateTotal(){

    this.total = this.cartItems.reduce(
      (sum,item)=>sum + (item.price * item.quantity),
      0
    );

  }

  increase(item:any){

    this.cartService.increaseQuantity(item);
    this.calculateTotal();

  }

  decrease(item:any){

    this.cartService.decreaseQuantity(item);
    this.calculateTotal();

  }

  remove(item:any){

    this.cartService.removeItem(item);
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();

    // Toast notification
    this.toastr.warning("Item removed from cart");

  }

  async placeOrder(){

    const orderPayload = {
      items: this.cartItems,
      status: "Placed",
      createdAt: new Date().toISOString()
    };

    try{

      const response = await fetch("http://localhost:5000/api/orders",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify(orderPayload)
      });

      await response.json();

      // Toast notification
      this.toastr.success("Order placed successfully");

    // Clear cart properly
     this.cartService.clearCart();
     this.cartItems = [];
     this.calculateTotal();

    }catch(error){

      console.error(error);
      this.toastr.error("Failed to place order");

    }

  }

}