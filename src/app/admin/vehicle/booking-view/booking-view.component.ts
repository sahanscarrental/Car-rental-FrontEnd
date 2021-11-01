import { Component, OnInit } from '@angular/core';
import {FileService} from "../../../service/file.service";
import {DriverService} from "../../service/driver.service";
import {BookingRecordService} from "../../service/booking-record.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-booking-view',
  templateUrl: './booking-view.component.html',
  styleUrls: ['./booking-view.component.scss']
})
export class BookingViewComponent implements OnInit {

  public imgUrl = "";
  public driver: any;
  public booking: any;
  constructor(public fileService: FileService, private bookingRecordService: BookingRecordService, private router: Router) {
    this.imgUrl = fileService.url;
  }
  ngOnInit(): void {
    this.booking = history.state;
    this.driver = this.booking.vehicleDriver
  }

  handOveKey() {
    this.bookingRecordService.update({...this.booking, bookingRecordState: 'PICKED'})
        .subscribe(value => {
            this.router.navigate(['/dashboard/vehicle/booking-list']);
        })
  }

  keyReceived() {
    this.bookingRecordService.update({...this.booking, bookingRecordState: 'COMPLETED'})
        .subscribe(value => {
            this.router.navigate(['/dashboard/vehicle/booking-list']);
        })
  }

  cancel() {
      this.bookingRecordService.update({...this.booking, bookingRecordState: 'CANCELED'})
          .subscribe(value => {
              this.router.navigate(['/dashboard/vehicle/booking-list']);
          })
  }
}
