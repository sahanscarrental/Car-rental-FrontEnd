import { Component, OnInit } from '@angular/core';
import {DriverService} from "../../service/driver.service";

@Component({
  selector: 'app-black-listed-divers',
  templateUrl: './black-listed-divers.component.html',
  styleUrls: ['./black-listed-divers.component.scss']
})
export class BlackListedDiversComponent implements OnInit {

  constructor(private driverService: DriverService) { }

  public driverList: Object[]  [];
  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.driverService.getAllBlackisted().subscribe(value => {
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
