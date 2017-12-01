import { Injectable } from '@angular/core';
import { Order, OrderStatus } from './order'
import { DevelopersService as CruiseDevloperService, CruiseItem } from '../../apis/carnivore-cruise-lines';

@Injectable()
export class PendingorderService {

  constructor(
    private cruises:CruiseDevloperService,
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
    this.order.transCarComplete = OrderStatus.sent;
    this.order.extraCarComplete = OrderStatus.sent;
    this.order.funComplete =  OrderStatus.sent;
    this.order.homestayComplete = OrderStatus.sent;  
    this.order.cruiseComplete = OrderStatus.sent;
    
    //TODO: Call service functions
    this.orderCruise();
  }

  orderCruise(){
    //this.order.cruiseComplete = OrderStatus.success;    
    this.cruises.selectItem(this.order.selectedCruiseId).subscribe(
      (value) => {
        //"Success"
        if(value.status == "Item you tried to purchase an unavailable item"){
          console.log("Carnivore order failure becaue no items remaining for "+ this.order.selectedCruiseId);          
          this.order.cruiseComplete = OrderStatus.error;
        }else{
          console.log("Carnivore order success for "+ this.order.selectedCruiseId);
          this.order.cruiseComplete = OrderStatus.success;
        }
      },
      (error) => {
        //Error
        console.log("Carnivore order error for "+ this.order.selectedCruiseId);
        this.order.cruiseComplete = OrderStatus.error;        
      }
    );
  }
}

