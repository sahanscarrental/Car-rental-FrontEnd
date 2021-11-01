import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { AddonListComponent } from './addon-list/addon-list.component';
import { AddonAddComponent } from './addon-add/addon-add.component';
import {ReactiveFormsModule} from "@angular/forms";

export const routes: Routes = [
  {
    path: 'list',
    component: AddonListComponent
  },
  {
    path: 'add',
    component:  AddonAddComponent
  }
]

@NgModule({
  declarations: [
    AddonListComponent,
    AddonAddComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AddonModule { }
