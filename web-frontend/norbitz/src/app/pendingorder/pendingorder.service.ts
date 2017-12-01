import { Injectable } from '@angular/core';
import { Order, OrderStatus } from './order'
import { DevelopersService as CruiseDevloperService, CruiseItem } from '../../apis/carnivore-cruise-lines';
import { UserService as HurtsService, Vehicle, SpecialEquipment, AdminService, UserService } from '../../apis/hurts-car-rental';
import { DefaultService as ScandalsService, Activity } from '../../apis/scandals';
import { FlightsService, PurchaseService, Flight, Path } from '../../apis/delter-airlines';
import { AdminsService as AirdndService, Listing, LocationListings, ListingDetails } from '../../apis/airdnd';
import { UserService as UsernameService } from '../user/user.service';

@Injectable()
export class PendingorderService {

  constructor(
    private cruises:CruiseDevloperService,
    private cars:HurtsService,
    private fun:ScandalsService,
    private homestays:AirdndService,
    private purchases:PurchaseService,
    private flights:FlightsService,
    private user:UsernameService,
    
  ) { }

  order: Order = new Order();

  clearOrder() {
    this.order = new Order();
  }

  getString() {
    return JSON.stringify(this.order);
  }

  submitOrderToThirdPartyServers() {
    console.log("Submiting order to 3rd party servers...");
    this.order.orderPlaced = true;
    
    if(this.order.selectedCruiseId){
      this.orderCruise();
    }
    if(this.order.transCarId){
      this.orderCar(true);
    }
    if(this.order.extraCarId){
      this.orderCar(false);
    }
    if(this.order.funIds.size > 0){
      this.orderFun();
    }
    if(this.order.homestayId){
      this.orderHomestay();
    }
    if(this.order.selectedFlightId){
      this.orderFlight();
    }
  }

  orderCruise(){
    this.order.cruiseComplete = OrderStatus.sent;    
    this.cruises.selectItem(this.order.selectedCruiseId).subscribe(
      (value) => {
        console.log("Carnivore order success for "+ this.order.selectedCruiseId);
        this.order.cruiseComplete = OrderStatus.success;
      },
      (error) => {
        console.log("Carnivore order error for "+ this.order.selectedCruiseId);
        this.order.cruiseComplete = OrderStatus.error;        
      }
    );
  }

  orderFlight(){
    console.log("Flight ordered");
    this.order.flightComplete = OrderStatus.sent;    
    this.purchases.placeOrder({
      ticketID: this.order.selectedTicketId,
      username: this.user.username.toString(),
      name: this.user.username.toString(),
    }).subscribe(
      (value) => {
        console.log("Carnivore order success for "+ this.order.selectedTicketId);
        this.order.flightComplete = OrderStatus.success;
      },
      (error) => {
        console.log("Carnivore order error for "+ this.order.selectedFlightId);
        this.order.flightComplete = OrderStatus.error;        
      } 
    );
  }

  orderCar(trans:boolean){
    if(trans){
      this.order.transCarComplete = OrderStatus.sent;
    } else {
      this.order.extraCarComplete = OrderStatus.sent;
    } 
    let vid = trans ? this.order.transCarId : this.order.extraCarId;
    this.cars.purchaseVehicle(vid, this.order.startDate, this.order.endDate).subscribe(
      (value) => {
        //"Success"
        console.log("Car order success for "+ vid); 
        console.log(value);
        if(trans){
          this.order.transCarComplete = OrderStatus.success;
        } else {
          this.order.extraCarComplete = OrderStatus.success;
        }     
      },
      (error) => {
        //Error
        console.log("Car order failure for "+ vid);
        console.log(error);
        if(trans){
          this.order.transCarComplete = OrderStatus.error;
        } else {
          this.order.extraCarComplete = OrderStatus.error;
        }        
      }
    );
  }

  orderFun(){
    for(let i in this.order.funIdsArr){
      let activityId:string = this.order.funIdsArr[i];
      this.order.funCompleteKV[activityId] = OrderStatus.sent;
      this.fun.activityNamePurchaseGet(activityId,1).subscribe(
        (value) => {
          //Success
          console.log("Fun order success for "+ activityId); 
          this.order.funCompleteKV[activityId] = OrderStatus.success;
        },
        (error) => {
          //Error
          console.log("Fun order failure for "+ activityId);
          this.order.funCompleteKV[activityId] = OrderStatus.error;   
        });
    }
  }

  orderHomestay(){
    this.order.homestayComplete = OrderStatus.sent;    
    this.homestays.controllersAdminsControllerAddReservation(this.order.homestayId,{
      reservationId: "reservationId-here",
      dates: [this.order.startDate, this.order.endDate],
      available: false,
    }).subscribe(
      (value) => {
        //Success
        console.log("Homestay order success for "+ this.order.homestayId);
        console.log(value); 
        this.order.homestayComplete = OrderStatus.success;
      },
      (error) => {
        //Error
        if(error.status && error.status == 201){
          console.log("Homestay order success for "+ this.order.homestayId);
          this.order.homestayComplete = OrderStatus.success;
        }else{
          console.log("Homestay order failure for "+ this.order.homestayId);
          console.log(error);         
          this.order.homestayComplete = OrderStatus.error;   
        }
      });
  }
}

