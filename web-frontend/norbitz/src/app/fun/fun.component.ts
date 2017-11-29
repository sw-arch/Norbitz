import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material';
import { PendingorderService } from '../pendingorder/pendingorder.service'
import { DefaultService as ScandalsService, Activity } from '../../apis/scandals';

@Component({
  selector: 'app-fun',
  templateUrl: './fun.component.html',
  styleUrls: ['./fun.component.css']
})
export class FunComponent implements OnInit {
  isLoading: boolean = true;
  scandalsActivities: Array<Activity>;
  scandalsDataSource: MatTableDataSource<Activity>;
  displayedColumns = ['select', 'name', 'description', 'location', 'quantity', 'time', 'cost'];
  selectedActivityNames: Set<string> = new Set<string>();

  constructor(
    private scandals: ScandalsService,
    private pending: PendingorderService,   
  ) { }

  @Input()
  location: string = "Huntsville, AL";

  @Input()
  fromDate: string = "2017-12-01T00:00:00";

  @Input()
  toDate: string = "2017-12-02T00:00:00";

  //Output an event when a event is selected/deselected
  @Output()
  selectionEvent = new EventEmitter();

  ngOnInit() {
    this.scandals.activityGet()
      .map((data: any) => {
        this.scandalsActivities = data.activities;
        let arr = new Array<any>();
        for (var key in this.scandalsActivities) {
          arr.push(this.scandalsActivities[key]);
        }
        return arr;
      })
      .subscribe((data) => {
        this.scandalsDataSource = new MatTableDataSource<Activity>(data);
        this.isLoading = false;
      }
    )
  }

  buttonStyle(vId){
    return this.selectedActivityNames.has(vId) ? "buttonselected" : "buttonregular";
  }

  selectActivity(activityName){
    if (this.selectedActivityNames.has(activityName)) {
      this.selectedActivityNames.delete(activityName);
      this.pending.order.funIdsAll = this.selectedActivityNames;      
      this.selectionEvent.emit(false);
    } else {
      this.selectedActivityNames.add(activityName);
      this.pending.order.funIdsAll = this.selectedActivityNames;  
      this.pending.order.funDataAll = this.scandalsActivities;
      this.selectionEvent.emit(true);
    }
  }

  toDateTimeDisplayString(orgDate){
    let dateObj:Date = new Date(orgDate);
    return dateObj.toLocaleDateString() + " at " + dateObj.toLocaleTimeString();
  }
}
