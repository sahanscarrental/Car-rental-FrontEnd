import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {RouterModule, Routes} from "@angular/router";
import { BannerComponent } from './banner/banner.component';
import {AuthGuard} from "../helper/auth-guard";
import {Role} from "../modals/role";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule)
      }
    ]
  }
]

@NgModule({
    declarations: [
        HomeComponent
    ],
    exports: [
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule
    ]
})
export class DriverModule { }
