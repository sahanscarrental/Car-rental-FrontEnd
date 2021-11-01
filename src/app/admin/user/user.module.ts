import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import {RouterModule, Routes} from "@angular/router";

export const routes: Routes = [
  {
    path: 'list',
    component: UserListComponent
  }
]

@NgModule({
  declarations: [
    UserListComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class UserModule { }
