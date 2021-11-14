import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';

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

  public isLoggedIn = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn =  JSON.parse(localStorage.getItem('isLoggedIn'));
  }

}
