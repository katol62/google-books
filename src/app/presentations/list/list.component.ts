import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from "../../services/google-books.service";

export interface IScroll {
  start: number;
  offset: number
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input()
  showFavorites: boolean | null = false

  private _favorites: string[] = [];
  @Input()
  set favorites(data: any) {
    this._favorites = data ? [...data] : [];
    this._filtered = [...this._filtered].map(item => ({...item, favorite: this._favorites.indexOf(item.id) !== -1}));
  }

  _filtered: any = []
  @Input()
  set filtered(data: any) {
    this._filtered = data ? [...data].map(item => ({...item, favorite: this._favorites.indexOf(item.id) !== -1})) : [];
  }

  totalBooks: any = 0
  @Input()
  set total(value: any) {
    this.totalBooks = value
  }

  @Output()
  public onScrollUpdate: EventEmitter<IScroll> = new EventEmitter<IScroll>();

  @Output()
  public onToggle: EventEmitter<Book> = new EventEmitter<Book>();

  @Output()
  public onSelect: EventEmitter<boolean> = new EventEmitter<boolean>();

  searchStart: number = 0;
  searchOffset: number = 30;

  throttle = 300;
  scrollDistance = 1;

  constructor() { }

  ngOnInit(): void {
  }

  onScroll() {
    console.log('scrolled!!');
    const offset = this.searchStart + this.searchOffset > this.totalBooks ? this.totalBooks - this.searchStart : this.searchOffset;
    this.searchStart += offset;
    this.onScrollUpdate.emit({start: this.searchStart, offset: this.searchOffset})
  }

  onUp() {
    console.log('scrolled up!');
  }

  toggleFavorites(book: Book) {
    // book.favorite = !book.favorite;
    this.onToggle.emit(book);
  }

  onCheck( $event: any ) {
    const checked = $event.currentTarget.checked;
    this.onSelect.emit(checked)
  }

}
