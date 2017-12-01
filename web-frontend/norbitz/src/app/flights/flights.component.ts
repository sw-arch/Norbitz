import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material';
import { PendingorderService } from '../pendingorder/pendingorder.service'
import { FlightsService, Path, Flight } from '../../apis/delter-airlines'

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
  isLoading: boolean = true;
  delterFlights: Array<Flight>;
  delterDataSource;
  displayedColumns = ['select', 'name'];
  selectedFlight: Flight;

  constructor(
    private delter: FlightsService,
    private pending: PendingorderService,   
  ) { }

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
    //TODO: Enable once ready for hotel intigration
    this.getData();

  }

  getData(){
    this.delter.fromLocationToLocationStartDateEndDate(this.origin, this.destination, this.fromDate, this.toDate)
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
      console.log("Delter search success for "+ this.origin + " " + this.destination);
      console.log(error)
    }
  );
  }
}
