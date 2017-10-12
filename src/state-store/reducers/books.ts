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
            debugger;
            return Object.assign({}, state, { loading: true });
        }

        case book.GET_COMPLETE: {
            const books = action.payload;
            const newBooks = books.filter(book => !state.ids.includes(book.id));
            debugger;
            const newIds = newBooks.map(book => book.id);

            debugger;
            return Object.assign({}, state, {
                entities: [...state.entities, ...newBooks],
                ids: [...state.ids, ...newIds],
                loading: false
            });
        }
    }
}

export const getBookState = createFeatureSelector<BookState>('books');

export const getBooks = createSelector(
    getBookState,
    (state: BookState) => state.entities
); 