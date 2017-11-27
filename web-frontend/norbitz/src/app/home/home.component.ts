import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service'
import { HeaderComponent } from '../header/header.component'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  startDate;
  endDate;

  constructor(
    private user: UserService,
  ) { }

  ngOnInit() {
    //Redirect user to login if not logged in
    this.user.verifyLoggedIn()
  }

}
