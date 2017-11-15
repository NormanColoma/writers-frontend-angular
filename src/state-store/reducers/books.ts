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
        case book.GET: 
        case book.GET_BY_AUTHOR: {
            
            return Object.assign({}, state, { loading: true });
        }

        case book.GET_COMPLETE:
        case book.GET_BY_AUTHOR_COMPLETE: {
            const books = action.payload;
            const newBooks = books.filter(book => !state.ids.includes(book.id));
            
            const newIds = newBooks.map(book => book.id);
            
            return Object.assign({}, state, {
                entities: [...state.entities, ...newBooks],
                ids: [...state.ids, ...newIds],
                loading: false
            });
        }

        case book.ADD_SUCCESS: {
            const newBook = action.payload;

            if(state.ids.indexOf(newBook.id) >= 0) {
                return state;
            }
            
            return Object.assign({}, state, { 
                entities: [...state.entities, newBook], ids: [ ...state.ids, newBook.id] 
            });
        }

        case book.SELECT_ONE:
        case book.FIND_ONE: {
            const selectedBookId = action.payload;

            return Object.assign({}, state, { selectedBookId });
        }

        case book.FIND_ONE_COMPLETE:
        case book.EDIT_SUCCESS: {
            const book = action.payload;

            const currentIndex = state.entities
                .findIndex(entity => entity.id === book.id);
            const index = currentIndex >= 0 ? currentIndex : 0;
            
            return {
                ids: [...state.ids, book.id],
                entities: Object.assign([], state.entities, {
                    [index]: book,
                }),
                loading: false,
                selectedBookId: state.selectedBookId,
            };
        }

        case book.EDIT: {
            const selectedBookId = action.payload.id;

            return Object.assign({}, state, { selectedBookId });
        }
        
        default:  {
            return state;
        }

    }
}

//This is only will be used when attaching feature to 'books' within module
export const getBookState = createFeatureSelector<BookState>('books');

export const getBooks = createSelector(
    getBookState,
    (state: BookState) => { 
        return state.entities
    }
);

export const getLoading = createSelector(
    getBookState,
    (state: BookState) => state.loading
)

export const getBooksExtenal = (state: BookState) => state.entities;
export const getLoadingExternal = (state: BookState) => state.loading;
export const getSelectedBookIdExternal = (state: BookState) => state.selectedBookId;
export const getSelectedBookExternal = (state: BookState) =>  state.entities.find(entity => entity.id === state.selectedBookId);