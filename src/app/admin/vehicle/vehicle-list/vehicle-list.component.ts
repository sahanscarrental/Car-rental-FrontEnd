import { Component, OnInit } from '@angular/core';
import {VehicleService} from "../../service/vehicle.service";

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit {

  constructor(
      private vehicleService: VehicleService
  ) { }

  vehicleList: Object = [];
  ngOnInit(): void {
    this.getAll();
  }

    getAll() {
      this.vehicleService.getAll().subscribe(value => {
        // @ts-ignore
        this.vehicleList = value.body;
      })
    }
    delete(id: any) {
        this.vehicleService.delete(id).subscribe(value => {
          this.getAll();
        });
    }
}
