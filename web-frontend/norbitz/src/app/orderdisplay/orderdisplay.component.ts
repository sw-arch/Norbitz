import { Component, OnInit } from '@angular/core';
import { PendingorderService } from '../pendingorder/pendingorder.service'

@Component({
  selector: 'app-orderdisplay',
  templateUrl: './orderdisplay.component.html',
  styleUrls: ['./orderdisplay.component.css']
})
export class OrderdisplayComponent implements OnInit {

  constructor(private pending: PendingorderService) { }

  ngOnInit() {
  }

  getKeys(ojb){
    return Object.keys(ojb);
  }

  getActivity(activityName){
    return this.pending.order.funDataAll.find((val)=>val.name==activityName);
  }

}
