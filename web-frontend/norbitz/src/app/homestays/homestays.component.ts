import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import { AdminsService as AirdndService, Listing, LocationListings, ListingDetails } from '../../apis/airdnd';

@Component({
  selector: 'app-homestays',
  templateUrl: './homestays.component.html',
  styleUrls: ['./homestays.component.css'],
})
export class HomestaysComponent implements OnInit {

  isLoading: boolean = true;
  listings: Array<Listing>;
  listingDataSource: MatTableDataSource<Listing>; 
  displayedColumns = ['select', 'name', 'neighborhood', 'location', 'cost'];  

  constructor(
    private airdnd: AirdndService,
  ) { }

  @Input()
  location: string = "Starkville, MS";

  @Input()
  fromDate: string = "2017-01-01T00:00:00";

  @Input()
  toDate: string = "2018-12-31T00:00:00";

  //Output an event when a car is selected/deselected
  @Output()
  selectionEvent = new EventEmitter();

  ngOnInit() {
    this.airdnd.controllersAdminsControllerSearchListing(this.location, this.fromDate, this.toDate)
      .subscribe((data) => {
        console.log(data);
        this.listings = data;
        this.listingDataSource = new MatTableDataSource<Listing>(data);
        this.isLoading = false;
      });
  }

}
