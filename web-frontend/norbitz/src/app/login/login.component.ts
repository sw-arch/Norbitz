import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { PublicService as NorbitzPublicService } from '../../apis/norbitz';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private norbitz: NorbitzPublicService, private cdRef: ChangeDetectorRef) { }

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
      function(data){
        //Success
        console.log("Login success - welcome " + data.username)        
      },
      function(err){
        //Err
        console.log(err)
        console.log("Login Error!")
        this.loginError = true;
        this.username = "random name here"
        //this.cdRef.detectChanges()
      })
  }

}
