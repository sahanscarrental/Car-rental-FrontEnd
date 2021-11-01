import { Component, OnInit } from '@angular/core';
import {BookingRecordService} from "../../../admin/service/booking-record.service";
import {AuthService} from "../../../service/auth.service";

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnInit {

  constructor(private bookingRecordService: BookingRecordService, private authService: AuthService) { }

  public bookingRecords: any[];
  ngOnInit(): void {
    this.bookingRecordService.getAll(this.authService.driver.id)
        .subscribe(value => {
          this.bookingRecords = value.body;
        }, error => {
          console.log(error);
        })
  }

}
