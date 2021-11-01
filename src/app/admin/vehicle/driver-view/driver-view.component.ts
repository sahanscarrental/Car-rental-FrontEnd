import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FileService} from "../../../service/file.service";
import {DriverService} from "../../service/driver.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-driver-view',
  templateUrl: './driver-view.component.html',
  styleUrls: ['./driver-view.component.scss']
})
export class DriverViewComponent implements OnInit {

  public imgUrl = "";
  public driverDOB = "";
  constructor(public fileService: FileService, private driverService: DriverService, private router: Router) {
    this.imgUrl = fileService.url;
  }

  public driver: any = null;
  ngOnInit(): void {
    this.driver = history.state;
    if (this.driver && this.driver.dob) {
      this.driverDOB = this.driver.dob.split('T')[0];
    }
  }

  activate() {
    this.driverService.update({...this.driver, driverState: 'ADMIN_APPROVED'})
        .subscribe(value => {
          this.router.navigate(['/dashboard/vehicle/driver-list']);
        })
  }

  reject() {
    this.driverService.update({...this.driver, driverState: 'ADMIN_REJECTED'})
        .subscribe(value => {
          this.router.navigate(['/dashboard/vehicle/driver-list']);
        })
  }
}
