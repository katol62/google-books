import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {BooksResult, GoogleBooksService} from "../../services/google-books.service";
import {catchError, EMPTY, exhaustMap, of, tap, map, mergeMap, concatMap, switchMap} from "rxjs";
import {booksLoad, booksLoadComplete, booksLoadError, SEARCH, total} from "../actions/book.actions";

@Injectable()
export class BooksEffects {

  constructor(private actions$: Actions, private googleBooks: GoogleBooksService ) { }

  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(booksLoad),
      exhaustMap(action =>
          this.googleBooks.getBooks(action.payload).pipe(
            map((result: BooksResult) => ({...result, items: result.items.map(item => ({...item, favorite: false}))})),
            concatMap( (final: BooksResult) => [
                booksLoadComplete({payload: [...final.items]}),
                total({payload: final.totalItems})
            ]),
            catchError(error => of(booksLoadError({ payload: error })))
          )
        )
      )
    );


}
