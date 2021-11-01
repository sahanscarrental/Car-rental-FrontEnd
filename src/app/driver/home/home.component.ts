
import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import { Role } from '../../modals/role';
import { DriverService } from '../../admin/service/driver.service';
import { FileService } from '../../service/file.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
      './home.component.scss',
    '../common.css',
    '../bootstrap.scss',
    '../../../assets/style/owlcarousel/assets/owl.carousel.min.css',
    '../../../assets/style/tempusdominus/css/tempusdominus-bootstrap-4.min.css'
  ]
})
export class HomeComponent implements OnInit {

  public isLoggedIn = false;
  public displayName: string;
  public displayUserName: string;
  public driverImage: null;
  public imgUrl: string;
  public faceImageId: string;
  public isBlackListed = false;
  public driver: any = null;

  constructor(
      private authService: AuthService, private driverService: DriverService, private fileService: FileService, private router: Router) { }

  public token: any;
  ngOnInit(): void {
    this.token = this.authService.token;
    this.isLoggedIn = this.authService.isLoggedIn;
    this.imgUrl = this.fileService.url;

    if (this.isLoggedIn) {
      this.displayName = this.authService.roles[0] === Role.ROLE_ADMIN ? 'Administrator' : this.authService.driver?.name;
      this.displayUserName = this.authService.userName;
      if (this.authService.driver) {
        this.driverService.get(this.authService.driver.id).subscribe(
            driver => {
              this.driver = driver.body;
              this.driverService.currentDriver = this.driver;
              this.faceImageId = driver.body?.faceImageId;
              this.isBlackListed = driver.body?.driverState === 'BLACK_LISTED';
            }
        );
      }
    }
  }

  logOut() {
    this.authService.logout();
  }

  viewProfile() {
    this.authService.roles[0] === Role.ROLE_DRIVER ?
        this.router.navigate(['driver/home/driver-profile'], {state: {driver: this.driverService.currentDriver}})
        // : this.router.navigate(['admin/admin-profile']);
        : console.log('admin profile clicked');
  }
}
