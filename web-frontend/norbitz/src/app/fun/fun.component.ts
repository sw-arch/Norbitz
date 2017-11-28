import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { DefaultService as ScandalsService, Activity } from '../../apis/scandals';
import { MatTableDataSource, MatTable } from '@angular/material';

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
  selectedActivityName = null;

  constructor(private scandals: ScandalsService) { }

  @Input()
  location: string = "Huntsville, AL";

  @Input()
  fromDate: string = "2017-12-01T00:00:00";

  @Input()
  toDate: string = "2017-12-02T00:00:00";

  //Output an event when a car is selected/deselected
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
    return vId == this.selectedActivityName ? "buttonselected" : "buttonregular";
  }

  selectActivity(activityName){
    if (activityName == this.selectedActivityName) {
      this.selectedActivityName = null;
      this.selectionEvent.emit(false);
    } else {
      this.selectedActivityName = activityName;
      this.selectionEvent.emit(true);
    }
  }
}
