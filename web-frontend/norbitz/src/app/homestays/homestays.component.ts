import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AdminsService as AirdndService } from '../../apis/airdnd';

@Component({
  selector: 'app-homestays',
  templateUrl: './homestays.component.html',
  styleUrls: ['./homestays.component.css'],
})
export class HomestaysComponent implements OnInit {

  constructor(
    private airdnd: AirdndService,
  ) { }

  @Input()
  location: string = "Starkville, MS";

  @Input()
  fromDate: string = "2017-12-01T00:00:00";

  @Input()
  toDate: string = "2017-12-02T00:00:00";

  //Output an event when a car is selected/deselected
  @Output()
  selectionEvent = new EventEmitter();

  ngOnInit() {
    this.airdnd.searchListing(this.location).subscribe(
      (data)=>{
        //Success
        console.log("Airdnd search success for "+this.location)
        console.log(data)
      },
      (error)=>{
        //Error
        console.log("Airdnd search error for "+this.location)
        console.log(error)
      }
    );
  }

}
