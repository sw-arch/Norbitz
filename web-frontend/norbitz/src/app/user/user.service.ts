import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

  constructor(
    private router: Router,
  ) { 
    //Not logged in by default
    this.loggedIn = false;
  }

  loggedIn: Boolean;
  username: String
  pastOrders: Object;

  //Redirect user to login if not logged in
  verifyLoggedIn(){
    if(!this.loggedIn){
      this.router.navigateByUrl('/login');
    }
  }

  logout(){
    this.loggedIn = false;
    this.router.navigateByUrl('/login');
  }

}
