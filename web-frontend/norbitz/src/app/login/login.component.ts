import { Component, OnInit } from '@angular/core';
import { PublicService as NorbitzPublicService } from '../../apis/norbitz';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private norbitz: NorbitzPublicService, private router: Router) { }

  ngOnInit() {
  }

  username = ""
  password = ""
  loginError = false;

  login(){
    console.log("Sending login: "+this.username+", "+this.password);
    this.loginError = false;
    this.norbitz.login({
      username: this.username,
      password: this.password,
    }).subscribe(
      (data) => {
        //Success
        console.log("Login success - welcome " + data.username)
        this.router.navigateByUrl('/home');
      },
      (err) => {
        //Err
        console.log(err)
        console.log("Login Error!")
        this.loginError = true;
      })
  }

}
