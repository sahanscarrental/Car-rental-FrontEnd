import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: [
      './car-detail.component.scss',
    '../../common.css',
    '../../bootstrap.scss',
    '../../../../assets/style/owlcarousel/assets/owl.carousel.min.css',
    '../../../../assets/style/tempusdominus/css/tempusdominus-bootstrap-4.min.css'
  ]
})
export class CarDetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
