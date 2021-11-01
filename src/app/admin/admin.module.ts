import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {AppAsideModule, AppBreadcrumbModule, AppFooterModule, AppHeaderModule, AppSidebarModule} from "@coreui/angular";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {RouterModule, Routes} from "@angular/router";
import {TabsModule} from "ngx-bootstrap/tabs";
import { VehicleListComponent } from './vehicle/vehicle-list/vehicle-list.component';
import { VehicleAddComponent } from './vehicle/vehicle-add/vehicle-add.component';
import {SnackbarModule} from "ngx-snackbar";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'addon',
        loadChildren: () => import('./addon/addon.module').then(m => m.AddonModule)
      },
      {
        path: 'vehicle',
        loadChildren: () => import('./vehicle/vehicle.module').then(m => m.VehicleModule)
      },
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
      },
    ]
  }
]

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    AppBreadcrumbModule,
    AppAsideModule,
    TabsModule,
    AppFooterModule,
    SnackbarModule,
    BsDropdownModule,
  ]
})
export class AdminModule { }
