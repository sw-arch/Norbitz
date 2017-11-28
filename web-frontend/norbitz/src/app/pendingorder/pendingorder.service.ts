import { Injectable } from '@angular/core';

export class Order {
  constructor() { }
  
  origin: string;
  desination: string;
  startDate: string;
  endDate: string;

  transCarId: any;
  transCarData = {};

  extraCarId: any;
  extraCarData = {};

  funId: any;
  funData = {};
}

@Injectable()
export class PendingorderService {

  constructor() { }

  order: Order = new Order();

  clearOrder(){
    this.order = new Order();
  }
}

