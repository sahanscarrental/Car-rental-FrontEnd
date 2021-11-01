import { Component, OnInit } from '@angular/core';
import {DriverService} from "../../service/driver.service";
import {BookingRecordService} from "../../service/booking-record.service";

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnInit {

  constructor(private bookingRecordService: BookingRecordService) { }

  public bookingList: Object[]  [];
  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.bookingRecordService.getAll().subscribe(value => {
      this.bookingList = value.body;
      console.log(this.bookingList)
    })
  }
  delete(id: any) {
    this.bookingRecordService.delete(id).subscribe(value => {
      this.getAll();
    });
  }

}
