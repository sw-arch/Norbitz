import { Component, OnInit } from '@angular/core';

import { PublicService as NorbitzPublicService } from '../../apis/norbitz';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private norbitz: NorbitzPublicService) { }

  ngOnInit() {
  }

  username = ""
  password = ""

  login(){
    console.log("Login: "+this.username+", "+this.password);

    this.norbitz.login({
      username: this.username,
      password: this.password,
    }).subscribe(data => console.log(data.userdata))
  }

}
