import { Component, OnInit } from '@angular/core';
import { PrivateService as NorbitzPrivateService } from '../../apis/norbitz';
import { UserService } from '../user/user.service';
import { Order } from '../pendingorder/order'

@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrls: ['./orderhistory.component.css']
})
export class OrderhistoryComponent implements OnInit {

  constructor(
    private norbitzPrivate: NorbitzPrivateService,
    private user: UserService,    
  ) { }

  ordersLoaded: boolean = false;
  orders: Array<Order> = new Array<Order>();

  ngOnInit() {
    this.norbitzPrivate.load(this.user.username.getValue()).subscribe(
      (data)=>{
        //Success
        console.log("Save load success")
        console.log(data)
        data.orders.forEach((orderStr) => {
          this.orders.push(JSON.parse(orderStr));
        });
        this.ordersLoaded = true;
      },
      (error)=>{
        //Error
        console.log("Save load failure!")
        console.log(error)
        this.ordersLoaded = true;        
      }
    );
  }

}
