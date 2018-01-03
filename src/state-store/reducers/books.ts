import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as book from '../actions/books';

import { Book } from '../../dashboard/shared/models/book';

export interface BookState {
    ids: string[];
    entities: { [id: string] : Book },
    loading: boolean,
    selectedBookId: string | null
}

export const initialState: BookState = {
    ids: [],
    entities: {},
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
            const entities = newBooks.reduce ((entities: { [id: string] : Book}, book) => {
                return {
                    ...entities,
                    [book.id]: book
                }
            }, { ...state.entities });

            return Object.assign({}, state, {
                entities,
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
                entities: {...state.entities, [newBook.id]: newBook}, ids: [ ...state.ids, newBook.id] 
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

            return {
                ids: [...state.ids, book.id],
                entities: Object.assign([], state.entities, {
                    [book.id]: book
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

export const getBooks = (state: BookState) => state.entities;
export const getLoading = (state: BookState) => state.loading;
export const getSelectedBookId = (state: BookState) => state.selectedBookId;
export const getSelectedBook = (state: BookState) =>  state.entities[state.selectedBookId];