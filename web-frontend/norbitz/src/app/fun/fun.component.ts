import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { DefaultService as ScandalsService, Activity } from '../../apis/scandals';
import { MatTableDataSource, MatTable } from '@angular/material';
import { PendingorderService } from '../pendingorder/pendingorder.service'

@Component({
  selector: 'app-fun',
  templateUrl: './fun.component.html',
  styleUrls: ['./fun.component.css']
})
export class FunComponent implements OnInit {
  isLoading: boolean = true;
  scandalsActivities: Array<Activity>;
  scandalsActivitiesArr: Array<Activity>;  
  scandalsDataSource: MatTableDataSource<Activity>;
  displayedColumns = ['select', 'name', 'description', 'location', 'quantity', 'time', 'cost'];
  selectedActivityName = null;

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
        this.scandalsActivitiesArr = data;
      }
    )
  }

  buttonStyle(vId){
    return vId == this.selectedActivityName ? "buttonselected" : "buttonregular";
  }

  selectActivity(activityName){
    if (activityName == this.selectedActivityName) {
      this.selectedActivityName = null;
      this.pending.order.funId = null;      
      this.selectionEvent.emit(false);
    } else {
      this.selectedActivityName = activityName;
      let activity:Activity = this.scandalsActivitiesArr.find((val)=>val.name==activityName);   
      this.pending.order.funId = activityName;
      this.pending.order.funData['Name'] = activity.name;
      this.pending.order.funData['Location'] = activity.location;
      this.pending.order.funData['Date and Time'] = activity.time;      
      this.pending.order.funData['Cost'] = activity.cost;
      this.selectionEvent.emit(true);
    }
  }
}
