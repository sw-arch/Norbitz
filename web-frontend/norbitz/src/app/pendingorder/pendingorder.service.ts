import { Injectable } from '@angular/core';
import { Order } from './order'

@Injectable()
export class PendingorderService {

  constructor() { }

  order: Order = new Order();

  submitOrderToThirdPartyServers() {
    console.log("submit order to 3rd party servers")
  }

  clearOrder() {
    this.order = new Order();
  }

  getString() {
    return JSON.stringify(this.order);
  }
}

