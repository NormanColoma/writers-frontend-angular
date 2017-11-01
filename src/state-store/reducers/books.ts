import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as book from '../actions/books';

import { Book } from '../../dashboard/shared/models/book';

export interface BookState {
    ids: string[];
    entities: Book[],
    loading: boolean,
    selectedBookId: string | null
}

export const initialState: BookState = {
    ids: [],
    entities: [],
    loading: false,
    selectedBookId: null
}

export function booksReducer(state = initialState, action: book.Actions): BookState {
    switch (action.type) {
        case book.GET: {
            
            return Object.assign({}, state, { loading: true });
        }

        case book.GET_COMPLETE:
        case book.GET_BY_AUTHOR_COMPLETE: {
            const books = action.payload;
            const newBooks = books.filter(book => !state.ids.includes(book.id));
            
            const newIds = newBooks.map(book => book.id);

            debugger;
            return Object.assign({}, state, {
                entities: [...state.entities, ...newBooks],
                ids: [...state.ids, ...newIds],
                loading: false
            });
        }

        case book.GET_BY_AUTHOR: {
            return Object.assign({}, state, { loading: true});
        }

        default:  {
            return state;
        }

    }
}

export const getBookState = createFeatureSelector<BookState>('books');

export const getBooks = createSelector(
    getBookState,
    (state: BookState) => state.entities
);

export const getLoading = createSelector(
    getBookState,
    (state: BookState) => state.loading
)

export const getBooksExtenal = (state: BookState) => state.entities;