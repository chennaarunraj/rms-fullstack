
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CartComponent } from './cart/cart.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [

  { path: '', component: HomeComponent },

  { path: 'menu', component: MenuComponent },

  { path: 'cart', component: CartComponent },

  { path: 'login', component: LoginComponent },

  { path: 'dashboard', component: DashboardComponent, canActivate:[authGuard]}

];