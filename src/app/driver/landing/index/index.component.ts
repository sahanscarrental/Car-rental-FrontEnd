import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: [
      './index.component.scss',
    '../../common.css',
    '../../bootstrap.scss',
    '../../../../assets/style/owlcarousel/assets/owl.carousel.min.css',
    '../../../../assets/style/tempusdominus/css/tempusdominus-bootstrap-4.min.css'
  ]
})
export class IndexComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
