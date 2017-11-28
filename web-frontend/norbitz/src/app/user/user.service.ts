import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class UserService {
  username: BehaviorSubject<string>;
  userdata: BehaviorSubject<Object>;

  constructor(
    private router: Router,
  ) {
    this.username = new BehaviorSubject<string>(null);
    this.userdata = new BehaviorSubject<Object>(null);
    this.setUserFromLocalstorage();
  }

  public login(data) {
    localStorage.setItem('username', data.username);
    localStorage.setItem('userdata', data.userdata);
    this.setUserFromLocalstorage();
    this.router.navigateByUrl('/home');
  }

  public isLoggedIn$() {
    return this.username.map(username => username !== null)
  }

  public logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('userdata');
    this.setUserFromLocalstorage();
    this.router.navigateByUrl('/login');
  }

  private setUserFromLocalstorage() {
    this.username.next(localStorage.getItem('username'));
    this.userdata.next(localStorage.getItem('userdata'));
  }
}
