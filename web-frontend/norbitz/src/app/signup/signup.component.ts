import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { PublicService as NorbitzPublicService } from '../../apis/norbitz';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  hide = true;
  username = "";
  password = "";
  signupErr = false;

  constructor(
    private user: UserService,
    private router: Router,
    private norbitz: NorbitzPublicService,
  ) { }

  ngOnInit() {
  }

  signUp() {
    this.norbitz.register({
      username: this.username,
      password: this.password,
      }).subscribe(
      (data) => {
        this.user.login(data);
      },
      (err) => {
        this.signupErr = true;
      })
  }

}
