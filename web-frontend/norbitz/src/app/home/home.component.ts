import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { UserService } from '../user/user.service';
import { ExtrasComponent } from '../extras/extras.component';
import {FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Validator, ValidationErrors, ValidatorFn } from '@angular/forms/src/directives/validators';
import { setTimeout } from 'timers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  startDate;
  endDate;
  origin;
  desination;

  reviewFormGroup: FormGroup;

  isLinear = true;
  reviewOk = false;
  showStepper = false;

  constructor(
    private user: UserService,
    private router: Router,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.user.isLoggedIn$().take(1).subscribe(
      isLoggedIn => {
        if(!isLoggedIn) this.router.navigateByUrl('/login');
      }
    );
    this.reviewFormGroup = this._formBuilder.group({
      cbCtrl: [false, Validators.required]
    });
  }

  search(){
    console.log(this.startDate);
    //TODO: Clear pending orders?
    this.showStepper = false;
    setTimeout(() => {
      this.showStepper = true;
    }, 100);
  }

}