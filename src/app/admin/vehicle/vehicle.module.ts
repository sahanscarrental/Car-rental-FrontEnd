import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleAddComponent } from './vehicle-add/vehicle-add.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DriverListComponent } from './driver-list/driver-list.component';
import { DriverViewComponent } from './driver-view/driver-view.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { BookingViewComponent } from './booking-view/booking-view.component';
import {TabsModule} from "ngx-bootstrap/tabs";
import {MessageListComponent} from "../message-list/message-list.component";
import { BlackListedDiversComponent } from './black-listed-divers/black-listed-divers.component';
import {ReportComponent} from "../report/report.component";
import { VehicleEditComponent } from './vehicle-edit/vehicle-edit.component';

export const routes: Routes = [
  {
    path:'message',
    component: MessageListComponent
  },
  {
    path:'report',
    component: ReportComponent
  },
  {
    path: 'driver-list',
    component: DriverListComponent
  },
  {
    path: 'black-listed',
    component: BlackListedDiversComponent
  },
  {
    path: 'driver-view',
    component: DriverViewComponent
  },
  {
    path: 'list',
    component: VehicleListComponent
  },
  {
    path: 'booking-list',
    component: BookingListComponent
  },
  {
    path: 'booking-view',
    component: BookingViewComponent
  },
  {
    path: 'add',
    component: VehicleAddComponent
  },
  {
    path: 'edit',
    component: VehicleEditComponent
  }
]

@NgModule({
  declarations: [
    VehicleAddComponent,
    VehicleListComponent,
    DriverListComponent,
    DriverViewComponent,
    BookingListComponent,
    BookingViewComponent,
    MessageListComponent,
    BlackListedDiversComponent,
    ReportComponent,
    VehicleEditComponent
  ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
        TabsModule,
        FormsModule,
    ]
})
export class VehicleModule { }
