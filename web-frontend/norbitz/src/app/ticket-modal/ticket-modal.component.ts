import { Component, Inject} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-ticket-modal',
  templateUrl: './ticket-modal.component.html',
  styleUrls: ['./ticket-modal.component.css']
})
export class TicketModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  // "id": 1,
  // "seat_number": "A1",
  // "price": 135,
  // "available": false

}


