import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../pendingorder/order'

@Component({
  selector: 'app-orderdisplay',
  templateUrl: './orderdisplay.component.html',
  styleUrls: ['./orderdisplay.component.css']
})
export class OrderdisplayComponent implements OnInit {

  constructor() { }

  @Input()
  order: Order;

  @Input()
  usedSavedTotals: Boolean = false;

  ngOnInit() {
  }

  getKeys(ojb){
    return Object.keys(ojb);
  }

  toDateDisplayString(orgDate){
    return new Date(orgDate).toLocaleDateString();
  }

  toDateTimeDisplayString(orgDate){
    let dateObj:Date = new Date(orgDate);
    return dateObj.toLocaleDateString() + " at " + dateObj.toLocaleTimeString();
  }

  getActivity(activityName){
    return this.order.funDataAll.find((val)=>val.name==activityName);
  }

}
