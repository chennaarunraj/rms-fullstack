import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../services/dashboard.service';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  orders: any[] = [];
  socket: any;

  constructor(private dashboardService: DashboardService, private router:Router) {}

  ngOnInit(): void {

    // Load existing orders
    this.loadOrders();

    // Connect to socket server
    this.socket = io('https://rms-backend-u7b6.onrender.com');

    // Listen for new orders
    this.socket.on('new-order', (order: any) => {
      console.log("New order received:", order);
      this.orders.unshift(order);
    });
    // order update
    this.socket.on('order-updated', (updatedOrder: any) => {
    const index = this.orders.findIndex(o => o._id === updatedOrder._id);

     if (index !== -1) {
      this.orders[index] = updatedOrder;
       }
      });
  }

  loadOrders() {
    this.dashboardService.getOrders().subscribe(data => {
      this.orders = data;
    });
  }

  updateStatus(order: any, status: string) {
  this.dashboardService.updateOrderStatus(order._id, status)
    .subscribe((updatedOrder: any) => {

      // Update UI instantly
      const index = this.orders.findIndex(o => o._id === updatedOrder._id);
      if (index !== -1) {
        this.orders[index] = updatedOrder;
      }

    });
}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}