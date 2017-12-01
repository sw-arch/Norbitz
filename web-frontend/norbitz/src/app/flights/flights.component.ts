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
  delterDataSource;
  displayedColumns = ['select', 'name', 'from', 'to', 'depart', 'return'];
  selectedFlight;

  constructor(
    private delter: FlightsService,
    private pending: PendingorderService,   
    public dialog: MatDialog,
  ) {}

  @Input()
  origin: string = "Starkville, MS";

  @Input()
  destination: string = "Huntsville, AL";

  @Input()
  fromDate: string = "2017-12-01T00:00:00";

  @Input()
  toDate: string = "2017-12-02T00:00:00";

  @Output()
  selectionEvent = new EventEmitter();

  ngOnInit() {
 
    this.delter.fromLocationToLocationStartDateEndDate(
       this.origin,
       this.destination,
       this.fromDate.substring(0,10),
       this.toDate.substring(0,10))
      .subscribe((value) => {
        //Success
        console.log("Delter search success for " + this.origin + " " + this.destination);
        console.log(value);
        this.delterFlights = value.flights;
        this.delterDataSource = new MatTableDataSource<Flight>(this.delterFlights);
        this.isLoading = false;
      },
      (error) => {
        //Error
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
      var orderObj = this.pending.order.selectedFlightData;
      orderObj['Name'] = flight.plane.flight_number;
      orderObj['From'] = flight.fromLocation;
      orderObj['To'] = flight.toLocation;
      orderObj['Depart'] = flight.startDate;
      orderObj['Return'] = flight.endDate;
      this.pending.order.startDate = flight.startDate;
      this.pending.order.endDate = flight.endDate;
      this.selectionEvent.emit(true);
    }
  }
  buttonStyle(cId){
    return cId == this.selectedFlight? "bselected" : "bregular";
  }

  toDateDisplayString(orgDate){
    return new Date(orgDate).toLocaleDateString();
  }

  openDialog() {
    const dialogRef = this.dialog.open(TicketModalComponent, {
      height: '350px',
      width: '1000px',
    });
  }
}
