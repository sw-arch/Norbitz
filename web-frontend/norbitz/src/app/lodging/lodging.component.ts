import { Component, OnInit } from '@angular/core';
import { AdminsService as AirdndService } from '../../apis/airdnd';

@Component({
  selector: 'app-lodging',
  templateUrl: './lodging.component.html',
  styleUrls: ['./lodging.component.css'],
})
export class LodgingComponent implements OnInit {

  constructor(
    private airdnd: AirdndService,
  ) { }

  destLocation = "Starkville, MS";

  ngOnInit() {
    this.airdnd.searchListing(this.destLocation).subscribe(
      (data)=>{
        //Success
        console.log("Airdnd search success for "+this.destLocation)
        console.log(data)
      },
      (error)=>{
        //Error
        console.log("Airdnd search error for "+this.destLocation)
        console.log(error)
      }
    );
  }

}
