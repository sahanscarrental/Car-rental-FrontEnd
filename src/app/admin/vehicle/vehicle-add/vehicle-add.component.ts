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
    image: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    vehicleNo: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    seats: new FormControl(4, [Validators.required]),
    costPerDay: new FormControl('', [Validators.required]),
    garage: new FormControl('', [Validators.required]),
    currency: new FormControl('LKR', [Validators.required]),
    gearType: new FormControl('', [Validators.required]),
    fuelType: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    vehicleCategory: new FormControl('', [Validators.required]),
    imageId: new FormControl('', [Validators.required]),
  });

  constructor(
      private garageService: GarageService,
      private vehicleService: VehicleService,
      private fileService: FileService,
      private router: Router
  ) { }

  garageList: any[] = [];
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
      };

      this.fileService.upload(file).subscribe(
          value => {
            const uploaded = value.body;
            this.vehicleForm.patchValue({
              imageId: uploaded.id
            });
          });
    }
  }


  submit() {
    const _garage = this.garageList.find(g => g.id === this.vehicleForm.value.garage );
    this.vehicleService.add({...this.vehicleForm.value, garage: _garage})
        .subscribe(value => {
          this.router.navigate(['/dashboard/vehicle/list']);
        });

  }
}
