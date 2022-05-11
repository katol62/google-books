import {Component, Input, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged, Subscription} from "rxjs";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  private sub: Subscription = new Subscription();

  @Output()
  public onSearch: EventEmitter<string> = new EventEmitter<string>();

  search: FormControl = new FormControl();

  constructor() { }

  ngOnInit(): void {
    this.sub = this.search.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe( value => {
        this.onSearch.emit(this.search.value)
      })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


}
