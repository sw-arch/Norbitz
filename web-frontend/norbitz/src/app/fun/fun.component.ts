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
    this.scandals.activityGet(null,null,null,this.location)
      .map((data: any) => {
        this.scandalsActivities = new Array<Activity>();
        for (var key in data.activities) {
          this.scandalsActivities.push(data.activities[key]);
        }
        return this.scandalsActivities;
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
    } else {
      this.selectedActivityNames.add(activityName);
    }
    this.pending.order.funDataAll = this.scandalsActivities;      
    this.pending.order.funIds = this.selectedActivityNames;      
    this.pending.order.updateFunIdsArr();

    if(this.selectedActivityNames.size > 0){
      this.selectionEvent.emit(true);      
    }else{
      this.selectionEvent.emit(false);
    }
  }

  toDateTimeDisplayString(orgDate){
    let dateObj:Date = new Date(orgDate);
    return dateObj.toLocaleDateString() + " at " + dateObj.toLocaleTimeString();
  }
}
