import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService as HurtsService, Vehicle, SpecialEquipment } from '../../apis/hurts-car-rental';
import { MatTableDataSource, MatTable } from '@angular/material';
import { PendingorderService } from '../pendingorder/pendingorder.service'

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  constructor(
    private hurts: HurtsService,
    private pending: PendingorderService,
  ) { }

  isLoading = true;
  displayedColumns = ['select','type','makeModel','passengers','mpg','extras','cost'];
  hurtsDataSource;
  hurtsVehicles: Vehicle[];
  selectedVehicleID = null;

  @Input()
  location: string = "Huntsville, AL";

  @Input()
  fromDate: string = "2017-12-01T00:00:00";

  @Input()
  toDate: string = "2017-12-02T00:00:00";

  //True if car is booked as an "extra" instead of the mode of transportation
  @Input()
  extraCar: Boolean = true;

  //Output an event when a car is selected/deselected
  @Output()
  selectionEvent = new EventEmitter();

  ngOnInit() {
    this.hurts.searchVehicles(this.location, this.fromDate, this.toDate).subscribe(
      (value: any) => {
        this.hurtsVehicles = value.vehicles;
        this.hurtsDataSource = new MatTableDataSource<Vehicle>(this.hurtsVehicles); 
        this.isLoading = false;
      },
      (error) => {
        console.log("Hurts search error for "+this.location)
        console.log(error)
      }
    );
  }

  selectCar(vehicleID){
    if(vehicleID == this.selectedVehicleID){
      this.selectedVehicleID = null;
      this.selectionEvent.emit(false);
      if(this.extraCar){
        this.pending.order.extraCarId = null;
      }else{
        this.pending.order.transCarId = null;        
      }
    }else{
      this.selectedVehicleID = vehicleID;
      if(this.extraCar){
        this.pending.order.extraCarId = vehicleID;
      }else{
        this.pending.order.transCarId = vehicleID;        
      }
      let vehicle:Vehicle = this.hurtsVehicles.find((val)=>val.vehicleID==vehicleID);
      var orderObj = this.extraCar ? this.pending.order.extraCarData : this.pending.order.transCarData;
      orderObj['Pickup Location'] = vehicle.location;  
      orderObj['Type'] = vehicle.type;
      orderObj['Make/Model'] = vehicle.year + " " + vehicle.make + " " + vehicle.model;    
      orderObj['Special Equipment'] = this.specialEquipToString(vehicle.specialEquipment);
      orderObj['Cost/Day'] = "$"+vehicle.cost.toFixed(2);
      if(this.extraCar){
        this.pending.order.extraCarCostPerDay = vehicle.cost;
      }else{
        this.pending.order.transCarCostPerDay = vehicle.cost;        
      }
      this.selectionEvent.emit(true);
    }
  }

  specialEquipToString(eq: SpecialEquipment){
    if(eq){
      var eqArr = new Array<String>();
      if(eq.gps){ eqArr.push("GPS") }
      if(eq.leftControl){ eqArr.push("Left Control") }
      //if(eq.maxChildSeat > 0){ eqArr.push("Child Seat Space (up to "+eq.maxChildSeat+")") }
      if(eq.skiRack){ eqArr.push("Ski Rack") }
      if(eq.snowChains){ eqArr.push("Snow Chains") }
      return eqArr.join(", ");
    }
    return "";
  }

  bStyle(vId){
    return vId == this.selectedVehicleID? "bselected" : "bregular";
  }

}
