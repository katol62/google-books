import {Book} from "../../services/google-books.service";
import {createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import {addFavorite, booksLoad, booksLoadComplete, booksLoadError, booksReset, removeFavorite, showFavorites, total} from "../actions/book.actions";

export interface IBooksState {
  loading: boolean,
  showFavorites: boolean,
  error: any,
  books: Book[],
  favourites: string[],
  total: number
}

export const initialState: IBooksState = {
  loading: false,
  showFavorites: false,
  error: null,
  books: [],
  favourites: [],
  total: 0
}

export const booksReducer = createReducer(
  initialState,
  on(booksLoad, (state) => {
    return {
      ...state,
      error: null,
      loading: true
    }
  }),
  on(booksReset, (state) => {
    const favourites = [...state.favourites];
    return {
      ...initialState,
      favourites
    }
  }),
  on(booksLoadError, (state, action) => {
    const error = action.payload;
    return {
      ...state,
      error,
      loading: false
    }
  }),
  on(booksLoadComplete, (state, action) => {
    const payload = action.payload ? action.payload : [];
    const books = [...state.books, ...payload]
    return {
      ...state,
      error: null,
      loading: false,
      books
    }
  }),
  on(total, (state, action) => {
    const total = action.payload ? action.payload : 0;
    return {
      ...state,
      total
    }
  }),
  on(removeFavorite, (state, action) => {
    let favourites = [...state.favourites];
    const index = favourites.indexOf(action.payload);
    if (index !== -1) {
      favourites.splice(index, 1);
    }
    return {
      ...state,
      favourites
    }
  }),
  on(addFavorite, (state, action) => {
    let favourites = [...state.favourites];
    if (favourites.indexOf(action.payload) === -1){
      favourites.push(action.payload)
    }
    return {
      ...state,
      favourites
    }
  }),
  on(showFavorites, (state, action) => {
    const showFavorites = action.payload;
    return {
      ...state,
      showFavorites
    }
  })
)

export const getBookState = createFeatureSelector<IBooksState>('book');

export const getTotal = createSelector(getBookState, state => state.total);
export const getBooks = createSelector(getBookState, state  => state.books);
export const getError = createSelector(getBookState, state => state.error);
export const getShowFavorites = createSelector(getBookState, state => state.showFavorites);
export const getFavorites = createSelector(getBookState, state => state.favourites)
export const getFiltered = createSelector(getBooks, getFavorites, getShowFavorites, (books, favourites, show) => {
    return books && books.length ? [...books].filter(book => show ? favourites.indexOf(book.id) !== -1 : book) : []
  }
)

