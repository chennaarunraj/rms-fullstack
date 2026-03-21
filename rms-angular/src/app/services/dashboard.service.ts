import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private API_URL = 'https://rms-backend-u7b6.onrender.com/api/orders';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL);
  }

  updateOrderStatus(id: string, status: string){
  return this.http.patch(`${this.API_URL}/${id}/status`, { status });
}


}