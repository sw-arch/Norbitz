import { Component, Inject, OnInit, Output, EventEmitter} from '@angular/core';
import { MatTableDataSource, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { PendingorderService } from '../pendingorder/pendingorder.service';

@Component({
  selector: 'app-ticket-modal',
  templateUrl: './ticket-modal.component.html',
  styleUrls: ['./ticket-modal.component.css']
})
export class TicketModalComponent implements OnInit {

  tickets;
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
    if(id == this.selectTicket){
      this.selectedTicket = null;
      this.selectionEvent.emit(false);
    }else{
      console.log("User selected Flight " + id);
      this.selectedTicket = id;
      let flight:any = this.tickets.find((val)=>val.id==id);
      this.pending.order.selectedTicketId = id;
      var orderObj = this.pending.order.selectedTicketData;
      this.tickets = flight.tickets;
      orderObj['Id'] = this.tickets.id;
      orderObj['Price'] = this.tickets.price;
      orderObj['Seat'] = this.tickets.seat_number;
      this.selectionEvent.emit(true);
    }
  }

  buttonStyle(cId){
    return cId == this.tickets.id? "bselected" : "bregular";
  }

}
