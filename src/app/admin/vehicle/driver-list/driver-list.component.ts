import { Component, OnInit } from '@angular/core';
import {DriverService} from "../../service/driver.service";

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.scss']
})
export class DriverListComponent implements OnInit {

  constructor(private driverService: DriverService) { }

  public driverList: Object[]  [];
  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.driverService.getAll().subscribe(value => {
      // @ts-ignore
      this.driverList = value.body;
    })
  }
  delete(id: any) {
    this.driverService.delete(id).subscribe(value => {
      this.getAll();
    });
  }

}
