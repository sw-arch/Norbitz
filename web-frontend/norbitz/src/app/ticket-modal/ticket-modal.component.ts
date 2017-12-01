import { Component, Inject, OnInit, Output, EventEmitter} from '@angular/core';
import { MatTableDataSource, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { PendingorderService } from '../pendingorder/pendingorder.service';

@Component({
  selector: 'app-ticket-modal',
  templateUrl: './ticket-modal.component.html',
  styleUrls: ['./ticket-modal.component.css']
})
export class TicketModalComponent implements OnInit {

  tickets = Array<any>();
  selectedTicket;
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['select', 'id', 'seat', 'price'];
  orderObj;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private pending: PendingorderService, ) {
    console.log("Creating modal w/: " + (this.data.tickets));
    this.tickets = this.data.tickets;
  }  

  @Output()
  selectionEvent = new EventEmitter();

  ngOnInit() {
    this.dataSource = new MatTableDataSource<any>(this.tickets);
    
  }

  selectTicket(id){
    if(id == this.selectedTicket){
      this.selectedTicket = null;
      this.selectionEvent.emit(false);
    }else{
      console.log("User selected Ticket " + id);
      this.selectedTicket = id;
      this.orderObj = this.pending.order.selectedFlightData;
      let ticket:any = this.tickets.find((val)=>val.id==id);
      this.pending.order.selectedTicketId = id;
      this.pending.order.selectedFlightPrice = ticket.price;
      this.tickets = ticket.tickets;
      this.orderObj['Id'] = ticket.id;
      this.orderObj['Price'] = "$"+ticket.price.toFixed(2);
      this.orderObj['Seat'] = ticket.seat_number;
      this.selectionEvent.emit(true);   
      console.log(JSON.stringify(this.pending.order.selectedFlightData));
    }
  }

  buttonStyle(cId){
    return cId == this.selectedTicket? "bselected" : "bregular";
  }

}
