import { Component, OnInit } from '@angular/core';
import { UserService as HurtsService, Vehicle, SpecialEquipment } from '../../apis/hurts-car-rental';
import { MatTableDataSource, MatTable } from '@angular/material';

@Component({
  selector: 'app-extras',
  templateUrl: './extras.component.html',
  styleUrls: ['./extras.component.css']
})
export class ExtrasComponent implements OnInit {

  constructor(
    private hurts: HurtsService,
  ) { }

  destLocation = "Huntsville, AL";
  isLoading = true;
  displayedColumns = ['select','type','makeModel','passengers',"extras",'cost'];
  hurtsDataSource;

  ngOnInit() {
    this.hurts.getVehicleByLocation(this.destLocation).subscribe(
      (value: any)=>{
        //Success
        console.log("Airdnd search success for "+this.destLocation)
        console.log(value)
        this.hurtsDataSource = new MatTableDataSource<Vehicle>(value.vehicles);        
        this.isLoading = false;
      },
      (error)=>{
        //Error
        console.log("Airdnd search error for "+this.destLocation)
        console.log(error)
      }
    );
  }

  selectCar(vehicleID){
    console.log("User selected vehicle " + vehicleID );
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
    return "bla";
  }

}
