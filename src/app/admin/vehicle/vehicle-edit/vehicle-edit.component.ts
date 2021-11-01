import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileService } from '../../../service/file.service';
import { VehicleService } from '../../service/vehicle.service';
import { Router } from '@angular/router';
import { WebScrapingService } from '../../../service/web-scraping.service';

@Component({
    selector: 'app-vehicle-edit',
    templateUrl: './vehicle-edit.component.html',
    styleUrls: ['./vehicle-edit.component.scss']
})
export class VehicleEditComponent implements OnInit {

    public imgUrl: string;
    public vehicle: any = null;
    scrapingList: any[] = [];
    public scrapeVehicle: any = null;
    public competitorsPrice = 0;
    vehicleForm = new FormGroup({
        id: new FormControl(),
        name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
        vehicleNo: new FormControl('', [Validators.required, Validators.maxLength(20)]),
        seats: new FormControl(0),
        costPerDay: new FormControl(''),
        garage: new FormControl(''),
        currency: new FormControl(''),
        gearType: new FormControl(''),
        fuelType: new FormControl(''),
        description: new FormControl(''),
        vehicleCategory: new FormControl(''),
        imageId: new FormControl(''),
    });

    constructor(
        private router: Router,
        private fileService: FileService,
        private vehicleService: VehicleService,
        private scrappingService: WebScrapingService) {
    }

    ngOnInit(): void {

        this.imgUrl = this.fileService.url;

        if (history.state) {
            this.vehicle = history.state;
            console.log('vehicle edit: ', history.state);
            this.vehicleForm.patchValue(history.state);
            this.getVehicleScrappingList();
        }
    }

    private getVehicleScrappingList() {
        this.scrappingService.getNewBeDev()
            .subscribe(value => {
                this.scrapingList = value.body;
                // @ts-ignore
                this.scrapeVehicle = this.scrapingList.find<any>(scrap => scrap.name == this.vehicle.name);
                if (this.scrapeVehicle && this.scrapeVehicle.ratePerWeek) {
                    this.competitorsPrice = +this.scrapeVehicle.ratePerWeek.split(' ')[1].replace(',', '') / 7;
                }
            });
    }


    submit() {
        console.log(this.vehicleForm.value);

        this.vehicleService.update(this.vehicle.id, this.vehicleForm.value).subscribe(
            respone => {
                console.log('update response: ', respone);
                this.router.navigate(['/dashboard/vehicle/list']);
            }
        );
    }

}

