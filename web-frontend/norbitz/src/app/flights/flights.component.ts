import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material';
import { PendingorderService } from '../pendingorder/pendingorder.service'
import { FlightsService, Path } from '../../apis/delter-airlines'

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
  isLoading: boolean = true;
  delterPaths: Array<Path>;
  delterDataSource: MatTableDataSource<Path>;
  displayedColumns = ['select', 'name'];
  selectedPath: Path;

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
    //this.getData();
  }

  getData(){
    this.delter.fromLocationToLocationStartDateEndDate(this.origin, this.destination, this.fromDate, this.toDate)
    .subscribe(/*Waiting on https://github.com/henryjr1/DelterAirlinesTeam3/issues/4 */);
  }
}
