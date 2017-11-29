import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { DevelopersService, CruiseItem, HistoryItem, AdminsService } from '../../apis/carnivore-cruise-lines';
import { MatTableDataSource, MatTable } from '@angular/material';

@Component({
  selector: 'app-cruises',
  templateUrl: './cruises.component.html',
  styleUrls: ['./cruises.component.css']
})
export class CruisesComponent implements OnInit {

  constructor(
    private cruises: DevelopersService,
    private admins: AdminsService,
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
      this.formDone.emit(true);
    }
  }

//
//   if(vehicleID == this.selectedVehicleID){
//   this.selectedVehicleID = null;
//   this.selectionEvent.emit(false);
//   if(this.extraCar){
//   this.pending.order.extraCarId = null;
// }else{
//   this.pending.order.transCarId = null;
// }
// }else{
//   this.selectedVehicleID = vehicleID;
//   if(this.extraCar){
//     this.pending.order.extraCarId = vehicleID;
//   }else{
//     this.pending.order.transCarId = vehicleID;
//   }
//   let vehicle:Vehicle = this.hurtsVehicles.find((val)=>val.vehicleID==vehicleID);
//   var orderObj = this.extraCar ? this.pending.order.extraCarData : this.pending.order.transCarData;
//   orderObj['Pickup Location'] = vehicle.location;
//   orderObj['Type'] = vehicle.type;
//   orderObj['Make/Model'] = vehicle.year + " " + vehicle.make + " " + vehicle.model;
//   orderObj['Special Equipment'] = this.specialEquipToString(vehicle.specialEquipment);
//   orderObj['Cost/Day'] = "$"+vehicle.cost.toFixed(2);
//   if(this.extraCar){
//     this.pending.order.extraCarCostPerDay = vehicle.cost;
//   }else{
//     this.pending.order.transCarCostPerDay = vehicle.cost;
//   }
//   this.selectionEvent.emit(true);
// }
// }
  buttonStyle(Id){
    return Id == this.selectedCruise? "bselected" : "bregular";
  }

}
