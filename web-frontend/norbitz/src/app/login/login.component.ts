import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service'
import { PublicService as NorbitzPublicService } from '../../apis/norbitz';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private norbitz: NorbitzPublicService,
    private user: UserService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  username = "";
  password = "";
  loginError = false;

  login(){
    this.loginError = false;
    this.user.loggedIn = false;
    this.norbitz.login({
      username: this.username,
      password: this.password,
    }).subscribe(
      (data) => {
        this.user.loggedIn = true;
        this.user.username = data.username;
        this.user.pastOrders = data.userdata;
        this.router.navigateByUrl('/home');        
      },
      (err) => {
        this.loginError = true;
      })
  }

}
