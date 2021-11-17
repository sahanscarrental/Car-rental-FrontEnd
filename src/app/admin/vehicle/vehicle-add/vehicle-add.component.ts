import { Component, OnInit } from '@angular/core';
import {GarageService} from "../../service/garage.service";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {VehicleService} from "../../service/vehicle.service";
import {FileService} from "../../../service/file.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-vehicle-add',
  templateUrl: './vehicle-add.component.html',
  styleUrls: ['./vehicle-add.component.scss']
})
export class VehicleAddComponent implements OnInit {

  public url: string  = "";
  vehicleForm = new FormGroup({
    image: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    vehicleNo: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    seats: new FormControl(4),
    costPerDay: new FormControl(''),
    garage: new FormControl(''),
    currency: new FormControl('LKR'),
    gearType: new FormControl(''),
    fuelType: new FormControl(''),
    description: new FormControl(''),
    vehicleCategory: new FormControl(''),
    imageId: new FormControl(''),
  });

  constructor(
      private garageService: GarageService,
      private vehicleService: VehicleService,
      private fileService: FileService,
      private router: Router
  ) { }

  garageList: Object = [];
  ngOnInit(): void {
    this.garageService.getAll().subscribe(value => {
      // @ts-ignore
      this.garageList = value.body;
    })
  }

  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        // @ts-ignore
        this.url = reader.result;
      }
      this.vehicleForm.patchValue({
        image: file
      });
    }
  }


  submit() {
    this.fileService.upload(this.vehicleForm.get('image').value).subscribe(value => {
      const uploaded = value.body;
      // @ts-ignore
      const _garage = this.garageList.find(g => g.id == this.vehicleForm.value.garage );
      this.vehicleService.add({...this.vehicleForm.value, garage: _garage, imageId: uploaded.id})
          .subscribe(value => {
            this.router.navigate(['/dashboard/vehicle/list']);
          });
    })

  }
}
