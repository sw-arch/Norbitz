import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import { AdminsService as AirdndService, Listing, LocationListings, ListingDetails } from '../../apis/airdnd';
import { PendingorderService } from '../pendingorder/pendingorder.service';

@Component({
  selector: 'app-homestays',
  templateUrl: './homestays.component.html',
  styleUrls: ['./homestays.component.css'],
})
export class HomestaysComponent implements OnInit {

  isLoading: boolean = true;
  listings: Array<Listing>;
  selectedListing: Listing;
  listingDataSource: MatTableDataSource<Listing>; 
  displayedColumns = ['select', 'name', 'neighborhood', 'location', 'cost', 'stars'];  

  constructor(
    private airdnd: AirdndService,
    private pending: PendingorderService
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

  buttonStyle(e){
    return e == this.selectedListing ? "buttonselected" : "buttonregular";
  }

  selectListing(listing){
    if (this.selectedListing == listing) {
      this.selectedListing = null;
      this.selectionEvent.emit(false);
    } else {
      this.selectedListing = listing;

      this.pending.order.homestayId = this.selectedListing.details.id;
      this.pending.order.homestayData = {
        name: this.selectedListing.details.name,
        neighborhood: this.selectedListing.details.neighborhood,
        location: this.selectedListing.details.location,
        cost: '$' + this.selectedListing.pricing.cost.toFixed(2),
      }
      this.pending.order.homestayCost = this.selectedListing.pricing.cost;

      this.selectionEvent.emit(true);
    }
  }
}
