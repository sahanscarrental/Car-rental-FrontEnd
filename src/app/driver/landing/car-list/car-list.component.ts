import {Component, OnInit, ViewChild} from '@angular/core';
import {VehicleService} from "../../../admin/service/vehicle.service";
import {FileService} from "../../../service/file.service";
import {ModalDirective} from "ngx-bootstrap/modal";
import {WebScrapingService} from "../../../service/web-scraping.service";

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: [
      './car-list.component.scss',
    '../../common.css',
    '../../bootstrap.scss',
    '../../../../assets/style/owlcarousel/assets/owl.carousel.min.css',
    '../../../../assets/style/tempusdominus/css/tempusdominus-bootstrap-4.min.css'
  ]
})
export class CarListComponent implements OnInit {
  @ViewChild('largeModal') public largeModal: ModalDirective;
  public imgUrl = "";
  constructor(
      private vehicleService: VehicleService,
      public fileService: FileService,
      private scrapingService: WebScrapingService
  ) {
    this.imgUrl = fileService.url;
  }

  compareVehicle: Object = {
    costPerDay: 0
  };
  compareOtherVehicle: Object = {
    name: '',
    ratePerMonth: 0,
    ratePerWeek: 0,
    ratePerDay: 0
  };
  vehicleList: Object[] = [];
  scrapingList: Object[] = [];
  scrapingVNameList: string[] = [];
  ngOnInit(): void {
    this.getAll();
    this.scrapingService.getNewBeDev()
        .subscribe(value => {
          this.scrapingList = value.body;
          this.scrapingList.forEach(value1 => {
            // @ts-ignore
            this.scrapingVNameList.push(value1.name)
          })
        })
  }

  isComparable(name) {
    return this.scrapingVNameList.includes(name)
  }

  newBeDev() {

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

  clickCompare(car: Object) {
    this.compareVehicle=car;
    // @ts-ignore
    const c = this.scrapingList.find<any>(value => value.name == car.name)
    if (c) {
      let rpw = c.ratePerWeek;
      this.compareOtherVehicle = {
        name: c.name,
        ratePerMonth: c.ratePerMonth,
        ratePerWeek: c.ratePerWeek,
        ratePerDay: c.ratePerWeek ? (+c.ratePerWeek.toString().split(' ')[1].replace(',', '')) / 7 : 'Not Available',
        rateCurrency: 'LKR'
      };
    }
  }
}
