import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { UserService } from '../user/user.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { PendingorderService } from '../pendingorder/pendingorder.service'
import { Order } from '../pendingorder/order'
import { PrivateService as NorbitzPrivateService } from '../../apis/norbitz';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  readonly possibleLocations = ["Starkville, MS", "Atlanta, GA", "Huntsville, AL"]

  origin;
  desination;
  port;

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
  booktype = "trip";

  flightSelected = false;
  transCarSelected = false;
  hotelSelected = false;
  homestaySelected = false;
  extrasCarSelected = false;
  funSelected = false;
  cruiseSelected = false;
  checkoutComplete = false;
  get transportationFormDone(){ return this.flightSelected || this.transCarSelected; }
  get lodgingFormDone(){ return this.hotelSelected || this.homestaySelected; }
  get extrasFormDone(){ return this.extrasCarSelected || this.funSelected; }
  get anyFormDone(){ return this.transportationFormDone || this.lodgingFormDone || this.extrasFormDone; }

  constructor(
    private user: UserService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private pending: PendingorderService,
    private norbitzPrivate: NorbitzPrivateService,
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
      'port': {required: false},
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
    this.port = this.possibleLocations[1];
    this.startDateCF.setValue(new Date("2017-12-01T06:00:00.000Z"));
    this.endDateCF.setValue(new Date("2017-12-03T06:00:00.000Z"));
  }

  search(){
    this.showStepper = false;

    this.flightSelected = false;
    this.transCarSelected = false;
    this.hotelSelected = false;
    this.homestaySelected = false;
    this.extrasCarSelected = false;
    this.funSelected = false;
    this.cruiseSelected = false;

    this.reviewOk = false;
    this.checkoutComplete = false;

    this.pending.clearOrder();

    this.pending.order.startDate = this.startDate;
    this.pending.order.endDate = this.endDate;
    this.pending.order.bookingType = this.booktype;
    switch(this.booktype){
      case 'trip':
        this.pending.order.origin = this.origin;
        this.pending.order.desination = this.desination;
        break;
      case 'cruise':
        this.pending.order.port = this.port;
        break;
    }
    
    setTimeout(() => {
      this.showStepper = true;
    }, 100);
  }

  placeOrder(stepper:MatStepper){
    this.reviewOk = true;
    this.checkoutComplete = true;
    setTimeout(() => {
      stepper.next();
      this.pending.submitOrderToThirdPartyServers();
      this.saveOrderToServer()
      let str:string = this.pending.getString();
      console.log(str);
      this.finalOrder = JSON.parse(str);
    }, 30);
  }

  public saveOrderToServer(){
    this.norbitzPrivate.save({
        username: this.user.username.getValue(),
        order: this.pending.getString(),
      }).subscribe(
        (data)=>{
          //Success
          console.log("Save data success")
          console.log(data)
        },
        (error)=>{
          //Error
          console.log("Save data failure!")
          console.log(error)
        }
      );
  }

  viewPastOrders(){
    this.router.navigateByUrl('/orders');
  }

  bookTypeChange(newType:string):boolean {
    this.showStepper = false;
    return true;
  }

}
