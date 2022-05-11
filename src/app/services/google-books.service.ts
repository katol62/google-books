import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ISearchPayload} from "../state/actions/book.actions";

export interface Book {
  id: string;
  volumeInfo?: {
    title: string;
    subtitle: string;
  },
  favorite?: boolean;
}

export interface BooksResult {
  items: Book[],
  kind: string;
  totalItems: number;
}


@Injectable({
  providedIn: 'root'
})
export class GoogleBooksService {

  private key: string = 'AIzaSyDorwKcoAq4X6LrWU5ojreQVKA6EOdqETw';
  private API_PATH: string = `https://www.googleapis.com/books/v1/volumes`;

  constructor( private http: HttpClient ) {
  }

  public getBooks( search: ISearchPayload ): Observable<any> {
    let params = new HttpParams().append('key', this.key).append('q',search.q).append('startIndex', search.startIndex).append('maxResults', search.maxResults)
    return this.http.get(this.API_PATH, {params: params})
  }
}
