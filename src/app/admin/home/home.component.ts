import { Component, OnInit } from '@angular/core';
import { navItems } from '../../_nav';
import {AuthService} from "../../service/auth.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = navItems;

  constructor(private authService: AuthService) { }
  email: string;

  ngOnInit(): void {
    this.email = localStorage.getItem("email");
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout() {
    this.authService.logout();
  }
}
