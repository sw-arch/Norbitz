import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService as HurtsService, Vehicle, SpecialEquipment } from '../../apis/hurts-car-rental';
import { MatTableDataSource, MatTable } from '@angular/material';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  constructor(
    private hurts: HurtsService,
  ) { }

  isLoading = true;
  displayedColumns = ['select','type','makeModel','passengers',"extras",'cost'];
  hurtsDataSource;
  hurtsVehicles;
  selectedVehicleID = null;

  @Input()
  location: string = "Huntsville, AL";

  @Input()
  fromDate: string = "2017-12-01T00:00:00";

  @Input()
  toDate: string = "2017-12-02T00:00:00";

  @Output() formDone = new EventEmitter();

  ngOnInit() {
    this.hurts.getVehicleByLocation(this.location).subscribe(
      (value: any)=>{
        //Success
        console.log("Hurts search success for "+this.location)
        console.log(value)
        this.hurtsVehicles = value.vehicles;
        this.hurtsDataSource = new MatTableDataSource<Vehicle>(this.hurtsVehicles); 
        this.isLoading = false;
      },
      (error)=>{
        //Error
        console.log("Hurts search error for "+this.location)
        console.log(error)
      }
    );
  }

  selectCar(vehicleID){
    if(vehicleID == this.selectedVehicleID){
      this.selectedVehicleID = null;
      this.formDone.emit(false);
    }else{
      console.log("User selected vehicle " + vehicleID );
      this.selectedVehicleID = vehicleID;
      this.formDone.emit(true);
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
