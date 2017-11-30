import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { DevelopersService, CruiseItem } from '../../apis/carnivore-cruise-lines';
import { MatTableDataSource } from '@angular/material';
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
  displayedColumns = ['select','available','price','name','duration','port',
                      'roomCapacity', 'roomID', 'depart', 'return'];
  cruiseDataSource;
  cruiseItems;
  selectedCruiseID = null;

  @Input()
  location: string = "Atlanta, GA";

  @Input()
  fromDate: string = "2017-12-01T00:00:00";

  @Input()
  toDate: string = "2017-12-02T00:00:00";


  @Output() formDone = new EventEmitter();

  ngOnInit() {
    this.cruises.searchForLocation(this.location).subscribe(
      (value: any)=>{
        //Success
        console.log("Carnivore search success for "+ this.location);
        console.log(value);
        this.cruiseItems = value.InventoryArr.data;
        this.cruiseDataSource = new MatTableDataSource<CruiseItem>(this.cruiseItems);
        this.isLoading = false;
      },
      (error)=>{
        //Error
        console.log("Carnivore search success for "+ this.location);
        console.log(error)
      }
    );
  }

  selectCruise(itemID){
    if(itemID == this.selectedCruiseID){
      this.selectedCruiseID = null;
      this.formDone.emit(false);
    }else{
      console.log("User selected Cruise " + itemID );
      this.selectedCruiseID = itemID;
      let cruise:CruiseItem = this.cruiseItems.find((val)=>val.itemID==itemID);
      this.pending.order.selectedCruisePrice = cruise.price;
      this.pending.order.selectedCruiseId = itemID;
      var orderObj = this.pending.order.selectedCruiseData;
      orderObj['Port'] = cruise.fromLocation;
      orderObj['Name'] = cruise.name;
      orderObj['Room Capacity'] = cruise.roomCapacity;
      orderObj['Room ID'] = cruise.roomID;
      orderObj['Duration'] = cruise.duration;
      orderObj['Available'] = cruise.available;
      orderObj['Price'] = "$"+cruise.price.toFixed(2);
      this.formDone.emit(true);
    }
  }

  buttonStyle(cId){
    return cId == this.selectedCruiseID? "bselected" : "bregular";
  }

}
