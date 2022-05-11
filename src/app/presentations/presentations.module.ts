import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import { SearchComponent } from './search/search.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ListComponent,
    SearchComponent
  ],
  exports: [
    ListComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PresentationsModule { }
