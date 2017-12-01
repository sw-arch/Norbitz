import { Injectable } from '@angular/core';
import { Order, OrderStatus } from './order'

@Injectable()
export class PendingorderService {

  constructor() { }

  order: Order = new Order();

  submitOrderToThirdPartyServers() {
    console.log("submit order to 3rd party servers");
    this.order.orderPlaced = true;
    this.order.transCarComplete = OrderStatus.sent;
    this.order.extraCarComplete = OrderStatus.sent;
    this.order.funComplete =  OrderStatus.sent;
    this.order.homestayComplete = OrderStatus.sent;  
    this.order.cruiseComplete = OrderStatus.sent;

    //TODO: Call service functions
  }

  clearOrder() {
    this.order = new Order();
  }

  getString() {
    return JSON.stringify(this.order);
  }
}

