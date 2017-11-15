import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromAuthors from './authors';
import * as fromBooks from './books';
import { BookState } from './books';

export interface AuthorState {
    authors: fromAuthors.State,
    books: fromBooks.BookState
}

export const reducers = {
    authors: fromAuthors.authorsReducer,
    books: fromBooks.booksReducer,
};

export const getAuthorState = createFeatureSelector<AuthorState>('authors');

export const getBookState = createSelector(
    getAuthorState,
    (state: AuthorState) => state.books
)

export const getAuthorsEntities = createSelector(
    getAuthorState,
    fromAuthors.getAuthors
);

export const getAuthorsLoading = createSelector(
    getAuthorState,
    fromAuthors.getLoading
)

export const getAuthorEntitySelected = createSelector(
    getAuthorState,
    fromAuthors.getSelectedAuthor
)

export const getAuthorEntityIdSelected = createSelector(
    getAuthorState,
    fromAuthors.getSelectedAuthorId
)

export const getBooksEntities = createSelector(
    getBookState,
    fromBooks.getBooksExtenal
)

export const getAuthorBooks = createSelector(
    getAuthorEntityIdSelected,
    getBooksEntities,
    (authorId, books) => books.filter(book => book.author_id === authorId)
)

export const getAuthorBooksLoading = createSelector(
    getBookState,
    fromBooks.getLoadingExternal
)

export const getBookEntitySelected = createSelector(
    getBookState,
    fromBooks.getSelectedBookExternal
)

export const getBookEntityIdSelected = createSelector(
    getBookState,
    fromBooks.getSelectedBookIdExternal
)