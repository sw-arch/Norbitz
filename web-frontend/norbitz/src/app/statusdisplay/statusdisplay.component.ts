import { Component, OnInit, Input } from '@angular/core';
import { OrderStatus } from '../pendingorder/order'

@Component({
  selector: 'app-statusdisplay',
  templateUrl: './statusdisplay.component.html',
  styleUrls: ['./statusdisplay.component.css']
})
export class StatusdisplayComponent implements OnInit {

  constructor() { }

  @Input()
  status: OrderStatus = OrderStatus.pending;

  ngOnInit() {
  }

}
