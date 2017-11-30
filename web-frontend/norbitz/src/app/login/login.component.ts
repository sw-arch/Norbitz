import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { PublicService as NorbitzPublicService } from '../../apis/norbitz';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private user: UserService,
    private norbitz: NorbitzPublicService,
  ) {}

  ngOnInit() {
    this.user.isLoggedIn$().take(1).subscribe(
      isLoggedIn => {
        if(isLoggedIn) this.router.navigateByUrl('/home');
      }
    );
  }

  hide = true;
  username = "";
  password = "";
  loginError = false;

  login(){
    this.loginError = false;

    this.norbitz.login({
      username: this.username,
      password: this.password,
    }).subscribe(
      (data) => {
        this.user.login(data);
      },
      (err) => {
        this.loginError = true;
      })
  }

  signup(){
    this.router.navigateByUrl('/signup');
  }

}
