import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private API_URL = 'http://rms-backend-u7b6.onrender.com/api/menu';

  constructor(private http: HttpClient) {}

  getMenu(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL);
  }
}