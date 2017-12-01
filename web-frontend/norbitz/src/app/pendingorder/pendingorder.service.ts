import { Injectable } from '@angular/core';
import { Order, OrderStatus } from './order'
import { DevelopersService as CruiseDevloperService, CruiseItem } from '../../apis/carnivore-cruise-lines';
import { UserService as HurtsService, Vehicle, SpecialEquipment } from '../../apis/hurts-car-rental';

@Injectable()
export class PendingorderService {

  constructor(
    private cruises:CruiseDevloperService,
    private cars:HurtsService,
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

  orderCar(trans:boolean){
    if(trans){
      this.order.transCarComplete = OrderStatus.pending;
    } else {
      this.order.extraCarComplete = OrderStatus.pending;
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
}

