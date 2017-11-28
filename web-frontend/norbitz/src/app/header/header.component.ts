import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  username: Observable<string>;

  constructor(private user: UserService) {
    this.isLoggedIn$ = this.user.isLoggedIn$();
    this.username = Observable.from(this.user.username);
  }

  ngOnInit() {
  }
}
