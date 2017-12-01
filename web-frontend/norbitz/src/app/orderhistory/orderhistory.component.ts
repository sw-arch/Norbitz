import { Component, OnInit } from '@angular/core';
import { PrivateService as NorbitzPrivateService } from '../../apis/norbitz';
import { UserService } from '../user/user.service';
import { Order } from '../pendingorder/order'
import { Router } from '@angular/router';

@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrls: ['./orderhistory.component.css']
})
export class OrderhistoryComponent implements OnInit {

  constructor(
    private norbitzPrivate: NorbitzPrivateService,
    private user: UserService,
    private router: Router,    
  ) { }

  ordersLoaded: boolean = false;
  orders: Array<Order> = new Array<Order>();

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders(){
    this.norbitzPrivate.load(this.user.username.getValue()).subscribe(
      (data) => {
        data.orders.forEach((orderStr) => {
          this.orders.push(JSON.parse(orderStr));
        });
        this.ordersLoaded = true;
      },
      (error) => {
        console.log("Save load failure!")
        console.log(error)
        this.ordersLoaded = true;        
      }
    );
  }

  clearOrderHistory(){
    this.ordersLoaded = false;
    this.norbitzPrivate._delete(this.user.username.getValue()).subscribe(
      (data) => {
        this.ordersLoaded = true;
        this.orders = new Array<Order>();
      },
      (error) => {
        console.log("Failure clearning orders!")
        console.log(error);
      }
    );
  }

  goHome(){
    this.router.navigateByUrl('/home');
  }

  toDateDisplayString(orgDate){
    return new Date(orgDate).toLocaleDateString();
  }

}
