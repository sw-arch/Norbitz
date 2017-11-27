import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './user/user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private user: UserService,
    private router: Router,    
  ) { }

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  logout(){
    this.user.loggedIn = false;
    this.router.navigateByUrl('/login');        
  }

}
