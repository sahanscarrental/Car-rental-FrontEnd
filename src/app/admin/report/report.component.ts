import { Component, OnInit } from '@angular/core';
import {BookingRecordService} from "../service/booking-record.service";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  constructor(private bookingRecordService: BookingRecordService) { }


  private from: any;
  private to: any;

  public bookingList: Object[]  [];
  ngOnInit(): void {
  }


  change() {
    console.log(this.from, " ", this.to)
    if (this.from && this.to) {
      this.bookingRecordService.getReportData(this.from,this.to).subscribe(value => {
        this.bookingList = value.body;
      })
    }
  }
}
