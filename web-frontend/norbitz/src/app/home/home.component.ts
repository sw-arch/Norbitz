import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  startDate;
  endDate;
  origin;

  constructor(
    private user: UserService,
    private router: Router    
  ) { }

  ngOnInit() {
    this.user.isLoggedIn$().take(1).subscribe(
      isLoggedIn => {
        if(!isLoggedIn) this.router.navigateByUrl('/login');
      }
    );
  }

  search(){
    //TEMP: Will prob start with transportation first
    this.router.navigateByUrl('/book/extras');    
  }

}
