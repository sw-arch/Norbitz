import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-ticket-modal',
  templateUrl: './ticket-modal.component.html',
  styleUrls: ['./ticket-modal.component.css']
})
export class TicketModalComponent implements OnInit {

  tickets;
  dataSource: MatTableDataSource<any>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log("Creating modal w/: " + (this.data.tickets));
    console.log(this.data.tickets);
    this.tickets = this.data.tickets;
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<any>(this.tickets);
  }

}
