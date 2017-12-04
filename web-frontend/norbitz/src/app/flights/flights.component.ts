import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatTable, MatDialog } from '@angular/material';
import { PendingorderService } from '../pendingorder/pendingorder.service'
import { FlightsService, Path, Flight } from '../../apis/delter-airlines'
import { TicketModalComponent } from '../ticket-modal/ticket-modal.component';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
  isLoading: boolean = true;
  delterFlights = Array<Flight>();
  tickets;
  delterDataSource;
  displayedColumns = ['select', 'name', 'from', 'to', 'depart', 'return'];
  selectedFlight;
  returnedTickets;
  orderObj;

  constructor(
    private delter: FlightsService,
    private pending: PendingorderService,   
    public dialog: MatDialog,
  ) {}

  @Input()
  origin: string = "Starkville, MS";

  @Input()
  destination: string = "Atlanta, GA";

  @Input()
  fromDate: string = "2017-12-28";

  @Input()
  toDate: string = "2017-12-29";

  @Output()
  selectionEvent = new EventEmitter();

  ngOnInit() {
    this.delter.fromLocationToLocationStartDateEndDate(
        this.origin,
        this.destination,
        this.fromDate.substring(0,10),
        this.toDate.substring(0,10))
      .subscribe(
        (value) => {
        this.delterFlights = value.flights;
        this.delterDataSource = new MatTableDataSource<Flight>(this.delterFlights);
        this.isLoading = false;
        },
        (error) => {
          console.log("Delter search error for " + this.origin + " " + this.destination);
          console.log(error)
        }
      );
  }

  selectFlight(id){
    if(id == this.selectedFlight){
      this.selectedFlight = null;
      this.selectionEvent.emit(false);
    }else{
      console.log("User selected Flight " + id);
      this.selectedFlight = id;
      let flight:any = this.delterFlights.find((val)=>val.id==id);
      this.pending.order.selectedFlightId = id;
      this.orderObj = this.pending.order.selectedFlightData;
      this.tickets = flight.tickets;
      this.orderObj['Name'] = flight.plane.flight_number;
      this.orderObj['From'] = flight.fromLocation;
      this.orderObj['To'] = flight.toLocation;
      this.orderObj['Depart'] = this.toDateDisplayString(flight.startDate);
      this.orderObj['Return'] = this.toDateDisplayString(flight.endDate);
      this.pending.order.startDate = flight.startDate;
      this.pending.order.endDate = flight.endDate;
      this.selectionEvent.emit(true);
      this.openDialog();
    }
  }
  buttonStyle(cId){
    return cId == this.selectedFlight? "bselected" : "bregular";
  }

  toDateDisplayString(orgDate){
    return new Date(orgDate).toLocaleDateString();
  }

  openDialog() {
    console.log(this.tickets)
    const dialogRef = this.dialog.open(TicketModalComponent, 
      {
      data: {
        tickets: this.tickets,
      }, height: '500px',
         width: '800px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.returnedTickets = result;
      this.orderObj['Id'] = this.returnedTickets.id;
      this.orderObj['Price'] = "$"+this.returnedTickets.price.toFixed(2);
      this.orderObj['Seat'] = this.returnedTickets.seat_number;
      console.log("Order: " + this.orderObj['Price']);
    });
  }
}
