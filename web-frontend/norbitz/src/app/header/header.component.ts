import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service'
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private user: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  logout(){
    this.user.logout();
  }
}
