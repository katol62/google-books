import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {RouterModule} from "@angular/router";
import {PresentationsModule} from "../../presentations/presentations.module";



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    PresentationsModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      }
    ]),

  ]
})
export class HomeModule { }
