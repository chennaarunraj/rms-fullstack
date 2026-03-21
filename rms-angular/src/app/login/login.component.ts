import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector:'app-login',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl:'./login.component.html',
  styleUrls:['./login.component.css']
})
export class LoginComponent{

  username="";
  password="";

  constructor(
    private authService:AuthService,
    private router:Router
  ){}

  async login(){

    const success = await this.authService.login(
      this.username,
      this.password
    );

    if(success){

      this.router.navigate(["/dashboard"]);

    }else{

      alert("Invalid credentials");

    }

  }

}