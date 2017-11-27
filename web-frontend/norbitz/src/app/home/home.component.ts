import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service'

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
    private router: Router    
  ) { }

  ngOnInit() {
    //Redirect user to login if not logged in
    this.user.verifyLoggedIn()
  }

  search(){
    //TEMP: Will prob start with transportation first
    this.router.navigateByUrl('/book/lodging');    
  }

}
