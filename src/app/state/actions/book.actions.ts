import {createAction, props} from "@ngrx/store";
import {Book} from "../../services/google-books.service";

export const SEARCH = '[Books] Search';
export const TOTAL = '[Books] Total';
export const RESET = '[Books] Reset';
export const SEARCH_UPDATE = '[Book] Search Update';
export const SEARCH_SCROLL_UPDATE = '[Book] Search Scroll Update';
export const SEARCH_COMPLETE = '[Book] Search Complete';
export const SEARCH_ERROR = '[Book] Search Error';
export const ADD_FAVORITE = '[Book] Add Favourite';
export const REMOVE_FAVORITE = '[Book] Remove Favourite';
export const SHOW_FAVORITE = '[Book] Show Favourite';

export interface ISearchPayload {
  q?: any,
  startIndex?: any,
  maxResults?: any
}
export const booksReset = createAction(
  RESET
)
export const booksLoad = createAction(
  SEARCH,
  props<{payload: ISearchPayload}>()
)
export const booksLoadComplete = createAction(
  SEARCH_COMPLETE,
  props<{payload: Book[]}>()
)
export const booksLoadError = createAction(
  SEARCH_ERROR,
  props<{payload: any}>()
)
export const total = createAction(
  TOTAL,
  props<{payload: number}>()
)
export const addFavorite = createAction(
  ADD_FAVORITE,
  props<{payload: string}>()
)
export const removeFavorite = createAction(
  REMOVE_FAVORITE,
  props<{payload: string}>()
)
export const showFavorites = createAction(
  SHOW_FAVORITE,
  props<{payload: boolean}>()
)
