import { Component, OnInit } from '@angular/core';
import {getBooks, getFavorites, getFiltered, getLoading, getShowFavorites, getTotal, IBooksState} from "../../state/reducers/books.reducer";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {Book} from "../../services/google-books.service";
import {addFavorite, booksLoad, booksReset, ISearchPayload, removeFavorite, showFavorites} from "../../state/actions/book.actions";
import {IScroll} from "../../presentations/list/list.component";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  filtered$: Observable<Book[]> = this.store.select(getFiltered);
  total$: Observable<number> = this.store.select(getTotal);
  favorites$: Observable<string[]> = this.store.select(getFavorites);
  showFavorites$: Observable<boolean> = this.store.select(getShowFavorites);
  loading$: Observable<boolean> = this.store.select(getLoading);
  // search$: Observable<ISearchPayload> = this.store.select(getSearch);
  search: ISearchPayload = {q: '', startIndex: 0, maxResults: 30};
  showLoading: boolean = false;

  constructor(private store: Store<IBooksState>) {
    this.loading$.subscribe(
      value => this.showLoading = value
    )
  }

  ngOnInit(): void {
    this.store.dispatch(booksLoad({payload: this.search}))
  }

  onScrollUpdate( $event: IScroll ) {
    this.search = {
      ...this.search,
      startIndex: $event.start,
      maxResults: $event.offset
    }
    this.store.dispatch(booksLoad({payload: this.search}))
  }

  onToggleFavorite( $event: Book ) {
    const id = $event.id.toString();
    const isFavourite = $event.favorite;
    if (!isFavourite) {
      this.store.dispatch(addFavorite({payload: id}))
    } else {
      this.store.dispatch(removeFavorite({payload: id}))
    }
  }

  onSearch( $event: string ) {
    const q = $event;
    this.store.dispatch(booksReset())
    this.search = {
      startIndex: 0,
      maxResults: 30,
      q
    }
    this.store.dispatch(booksLoad({payload: this.search}))
  }

  onSelect( $event: boolean ) {
    this.store.dispatch(showFavorites({payload: $event}));
  }

}
