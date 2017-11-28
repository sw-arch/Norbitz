import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { UserService } from '../user/user.service';
import { ExtrasComponent } from '../extras/extras.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  readonly possibleLocations = ["Starkville, MS", "Atlanta, GA", "Huntsville, AL"]

  origin;
  desination;
 
  private emptyDate: Date;
  private startDateCF = new FormControl({value: this.emptyDate, disabled: true, required: true});
  private endDateCF = new FormControl({value: this.emptyDate, disabled: true, required: true});
  get startDate(){ return this.startDateCF.value.toISOString().substr(0,19); }
  get endDate(){ return this.endDateCF.value.toISOString().substr(0,19); };
  
  searchFormGroup: FormGroup;
  reviewFormGroup: FormGroup;

  isLinear = true;
  reviewOk = false;
  showStepper = false;
  extrasFormDone = false;


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
    this.searchFormGroup = this._formBuilder.group({
      'origin': '',
      'desination': '',
      'startDate': this.startDateCF,
      'endDate': this.endDateCF,
    });
    this.searchFormGroup.valueChanges.subscribe(data => {
      if(this.showStepper){
        this.search();
      }
    });

    //TODO: Remove placeholder for testing
    this.origin = this.possibleLocations[0];
    this.desination = this.possibleLocations[1];
    this.startDateCF.setValue(new Date("2017-12-01T05:00:00.000Z"));
    this.endDateCF.setValue(new Date("2017-12-03T05:00:00.000Z"));    
  }

  search(){
    //TODO: Clear pending orders?
    this.extrasFormDone = false;
    this.showStepper = false;
    setTimeout(() => {
      this.showStepper = true;
    }, 100);
  }

}