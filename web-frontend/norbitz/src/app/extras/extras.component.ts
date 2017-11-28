import { Component, OnInit } from '@angular/core';
import { UserService as HurtsService, Vehicle } from '../../apis/hurts-car-rental';
import { MatTableDataSource, MatTable } from '@angular/material';
import { HttpEvent } from '@angular/common/http';

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
  displayedColumns = ['select','makeModel','passengers','cost'];
  hurtsDataSource;

  ngOnInit() {
    this.hurts.getVehicleByLocation(this.destLocation).subscribe(
      (value: Vehicle[])=>{
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

}
