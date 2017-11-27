import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  constructor() { 
    this.loggedIn = false;
  }

  loggedIn: Boolean;
  username: String
  pastOrders: Object;

}
