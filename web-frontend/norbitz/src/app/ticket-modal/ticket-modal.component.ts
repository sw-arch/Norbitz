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
      console.log("User selected Flight " + id);
      this.selectedTicket = id;
      let ticket:any = this.tickets.find((val)=>val.id==id);
      this.pending.order.selectedTicketId = id;
      this.pending.order.selectedTicketPrice = ticket.price;
      var orderObj = this.pending.order.selectedTicketData;
      this.tickets = ticket.tickets;
      orderObj['Id'] = ticket.id;
      orderObj['Price'] = ticket.price;
      orderObj['Seat'] = ticket.seat_number;
      this.selectionEvent.emit(true);
    }
  }

  buttonStyle(cId){
    return cId == this.selectedTicket? "bselected" : "bregular";
  }

}
