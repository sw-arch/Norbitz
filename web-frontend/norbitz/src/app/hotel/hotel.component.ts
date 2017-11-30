import { Component, OnInit } from '@angular/core';
import { ReservationService, RoomService, Room, Reservation } from '../../apis/hilbun-hotels';
import { MatTableDataSource, MatTable } from '@angular/material';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {

  constructor(
    private rooms: RoomService,
  ) {}

  id = 1;
  isLoading = true;
  displayedColumns = ['select','number','type','cost',"location",'status'];
  roomDataSource;

  ngOnInit() {
    //TODO: Enable once ready for hotel intigration
    //this.getData();
  }

  getData(){
    this.rooms.getroomById(this.id).subscribe(
      (value: any)=>{
        //Success
        console.log("Search success for Hilbun Rooms "+ this.id)
        console.log(value)
        this.roomDataSource = new MatTableDataSource<Room>(value.rooms);
        this.isLoading = false;
      },
      (error)=>{
        //Error
        console.log("Hilbun search error for "+this.id);
        console.log(error);
      }
    );
  }

  selectRoom(roomID){
    console.log("User selected Room: " + roomID );
  }


  // specialEquipToString(eq: SpecialEquipment){
  //   if(eq){
  //     var eqArr = new Array<String>();
  //     if(eq.gps){ eqArr.push("GPS") }
  //     if(eq.leftControl){ eqArr.push("Left Control") }
  //     //if(eq.maxChildSeat > 0){ eqArr.push("Child Seat Space (up to "+eq.maxChildSeat+")") }
  //     if(eq.skiRack){ eqArr.push("Ski Rack") }
  //     if(eq.snowChains){ eqArr.push("Snow Chains") }
  //     return eqArr.join(", ");
  //   }
  //   return "bla";
  //}

}
