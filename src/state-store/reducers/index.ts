import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import * as fromAuthors from './authors';
import * as fromBooks from './books';

export interface CollectionState {
    authors: fromAuthors.AuthorState,
    books: fromBooks.BookState
}

export const reducers: ActionReducerMap<CollectionState> = {
    authors: fromAuthors.authorsReducer,
    books: fromBooks.booksReducer
};

export const getCollectionState = createFeatureSelector<CollectionState>('collection');