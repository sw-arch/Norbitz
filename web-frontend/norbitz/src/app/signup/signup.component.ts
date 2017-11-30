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
  signupError = false;
  submittedusername = "";

  constructor(
    private user: UserService,
    private router: Router,
    private norbitz: NorbitzPublicService,
  ) { }

  ngOnInit() {
  }

  signUp() {
    this.submittedusername = this.username;
    this.signupError = false;
    this.norbitz.register({
      username: this.username,
      password: this.password,
      }).subscribe(
      (data) => {
        this.user.login(data);
      },
      (err) => {
        if(err.status==401){
          this.signupError = true;
        }
      })
  }

  goToLogin(){
    this.router.navigateByUrl('/login');
  }

  get validUsername(){
    return /^[a-z]+$/i.test(this.username);
  }

}
