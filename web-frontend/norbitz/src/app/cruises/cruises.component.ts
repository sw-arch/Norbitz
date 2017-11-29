import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { DevelopersService, CruiseItem, HistoryItem, AdminsService } from '../../apis/carnivore-cruise-lines';
import { MatTableDataSource, MatTable } from '@angular/material';
import { PendingorderService } from '../pendingorder/pendingorder.service'

@Component({
  selector: 'app-cruises',
  templateUrl: './cruises.component.html',
  styleUrls: ['./cruises.component.css']
})
export class CruisesComponent implements OnInit {

  constructor(
    private cruises: DevelopersService,
    private pending: PendingorderService,
  ) { }

  isLoading = true;
  displayedColumns = ['select','available','cost','name','duration','port',
                      'roomCapacity', 'roomID', 'depart', 'return'];
  cruiseDataSource;
  cruiseItems;
  selectedCruise = null;

  @Input()
  city: string = "Atlanta";
  state: string = "GA";
  num: number = 1;


  @Output() formDone = new EventEmitter();

  ngOnInit() {
    this.cruises.searchForLocation(this.state, this.city).subscribe(
      (value: any)=>{
        //Success
        console.log("Carnivore search success for "+ this.city + ', ' + this.state);
        console.log(value);
        this.cruiseItems = value.cruiseItems;
        this.cruiseDataSource = new MatTableDataSource<CruiseItem>(this.cruiseItems);
        this.isLoading = false;
      },
      (error)=>{
        //Error
        console.log("Carnivore search success for "+ this.city + ', ' + this.state);
        console.log(error)
      }
    );
  }

  selectCruise(cruiseId){
    if(cruiseId == this.selectedCruise){
      this.selectedCruise = null;
      this.formDone.emit(false);
    }else{
      console.log("User selected Cruise " + cruiseId );
      this.selectedCruise = cruiseId;
      let cruise:CruiseItem = this.cruiseItems.find((val)=>val.cruiseLinerID==cruiseId);
      var orderObj = this.pending.order.selectedCruiseId;
      orderObj['Port'] = cruise.fromLocation;
      orderObj['Name'] = cruise.name;
      orderObj['Room Capacity'] = cruise.roomCapacity;
      orderObj['Room ID'] = cruise.roomID;
      orderObj['Duration'] = cruise.duration;
      orderObj['Cost/Day'] = "$"+cruise.price.toFixed(2);
      this.formDone.emit(true);
    }
  }

  buttonStyle(Id){
    return Id == this.selectedCruise? "bselected" : "bregular";
  }

}
