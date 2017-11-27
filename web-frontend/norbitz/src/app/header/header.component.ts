import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private user: UserService,
  ) { }

  ngOnInit() {
  }

  logout(){
    this.user.logout();
  }

}
