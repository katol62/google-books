import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {RouterModule} from "@angular/router";
import {PresentationsModule} from "../../presentations/presentations.module";
import {NgxSpinnerModule} from "ngx-spinner";



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    PresentationsModule,
    NgxSpinnerModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      }
    ]),

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class HomeModule { }
