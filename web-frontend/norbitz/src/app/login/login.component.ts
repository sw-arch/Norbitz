import { Component, OnInit } from '@angular/core';
import { PublicService as NorbitzPublicService } from '../../apis/norbitz';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service'
import { HeaderComponent } from '../header/header.component'

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
    console.log("Sending login: "+this.username+", "+this.password);
    this.loginError = false;
    this.user.loggedIn = false;
    this.norbitz.login({
      username: this.username,
      password: this.password,
    }).subscribe(
      (data) => {
        console.log("Login success - welcome " + data.username)
        this.user.loggedIn = true;
        this.user.username = data.username;
        this.user.pastOrders = data.userdata;
        this.router.navigateByUrl('/home');        
      },
      (err) => {
        console.log(err)
        console.log("Login Error!")
        this.loginError = true;
      })
  }

}
