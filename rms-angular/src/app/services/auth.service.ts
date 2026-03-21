import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  async login(username:string,password:string){

    const response = await fetch("http://rms-backend-u7b6.onrender.com/api/auth/login",{

      method:"POST",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify({username,password})

    });

    const data = await response.json();

    if(data.token){

      localStorage.setItem("token",data.token);

      return true;

    }

    return false;

  }

  logout(){

    localStorage.removeItem("token");

  }

  isLoggedIn(){

    return !!localStorage.getItem("token");

  }

}