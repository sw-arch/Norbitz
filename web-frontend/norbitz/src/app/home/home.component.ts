import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { UserService } from '../user/user.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { PendingorderService } from '../pendingorder/pendingorder.service'
import { Order } from '../pendingorder/order'

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
  finalOrder:Order = new Order();

  flightSelected = false;
  transCarSelected = false;
  hotelSelected = false;
  roomSelected = false;
  extrasCarSelected = false;
  funSelected = false;
  checkoutComplete = false;
  get transportationFormDone(){ return this.flightSelected || this.transCarSelected; }  
  get lodgingFormDone(){ return this.hotelSelected || this.roomSelected; }  
  get extrasFormDone(){ return this.extrasCarSelected || this.funSelected; }  
  get anyFormDone(){ return this.transportationFormDone || this.lodgingFormDone || this.extrasFormDone; }  
  
  constructor(
    private user: UserService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private pending: PendingorderService,
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

    //TODO: Remove these placeholder meant for testing
    this.origin = this.possibleLocations[2];
    this.desination = this.possibleLocations[1];
    this.startDateCF.setValue(new Date("2017-12-01T05:00:00.000Z"));
    this.endDateCF.setValue(new Date("2017-12-03T05:00:00.000Z"));    
  }

  search(){
    this.showStepper = false;

    this.flightSelected = false;
    this.transCarSelected = false;
    this.hotelSelected = false;
    this.roomSelected = false;
    this.extrasCarSelected = false;
    this.funSelected = false;

    this.reviewOk = false;
    this.checkoutComplete = false;

    this.pending.clearOrder();
    this.pending.order.origin = this.origin;
    this.pending.order.desination = this.desination;
    this.pending.order.startDate = this.startDate;
    this.pending.order.endDate = this.endDate;

    setTimeout(() => {
      this.showStepper = true;
    }, 100);
  }

  placeOrder(stepper:MatStepper){
    this.reviewOk = true;
    this.checkoutComplete = true;
    setTimeout(() => {
      stepper.next();
      console.log("TODO: Place order(s)");
      let str:string = this.pending.getString();
      this.finalOrder = JSON.parse(str);
    }, 30);
  }

}