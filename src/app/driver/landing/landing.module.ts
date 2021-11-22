import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import {RouterModule, Routes} from "@angular/router";
import { CarListComponent } from './car-list/car-list.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { CarBookingComponent } from './car-booking/car-booking.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DatepickerModule} from "ngx-bootstrap/datepicker";
import { BookingListComponent } from './booking-list/booking-list.component';
import {BannerComponent} from "../banner/banner.component";
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermConditionsComponent } from './term-conditions/term-conditions.component';
import {ModalModule} from "ngx-bootstrap/modal";
import {AuthGuard} from "../../helper/auth-guard";
import {Role} from "../../modals/role";
import { DriverProfileComponent } from './driver-profile/driver-profile.component';
export const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path:'privacy-policy',
    component: PrivacyPolicyComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ROLE_DRIVER]}
  },
  {
    path:'term-conditions',
    component: TermConditionsComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ROLE_DRIVER]}
  },
  {
    path: 'car-list',
    component: CarListComponent, // car list is quite open for every one to view
    data: {roles: [Role.ROLE_DRIVER]}
  },
  {
    path: 'car-detail',
    component: CarDetailComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ROLE_DRIVER]}
  },
  {
    path: 'car-booking',
    component: CarBookingComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ROLE_DRIVER]}
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ROLE_DRIVER]}
  },
  {
    path: 'booking-list',
    component: BookingListComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ROLE_DRIVER]}
  },
    {
    path: 'driver-profile',
    component: DriverProfileComponent,
    canActivate: [AuthGuard],
    data: {roles: [Role.ROLE_DRIVER]}
  }
]


@NgModule({
  declarations: [
    IndexComponent,
    CarListComponent,
    CarDetailComponent,
    CarBookingComponent,
    ContactUsComponent,
    BookingListComponent,
    BannerComponent,
    PrivacyPolicyComponent,
    TermConditionsComponent,
    DriverProfileComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        DatepickerModule,
        ModalModule,
        FormsModule,
    ]
})
export class LandingModule { }
