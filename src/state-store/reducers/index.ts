import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromAuthors from './authors';
import * as fromBooks from './books';
import { BookState } from './books';

export interface CollectionState {
    authors: fromAuthors.State,
    books: fromBooks.BookState
}

export const reducers = {
    authors: fromAuthors.authorsReducer,
    books: fromBooks.booksReducer,
};

export const getCollectionState = createFeatureSelector<CollectionState>('collection');
export const getAuthorState = createSelector(
    getCollectionState,
    (state: CollectionState) => state.authors
)
export const getBookState = createSelector(
    getCollectionState,
    (state: CollectionState) => state.books
)

export const getAuthorsEntities = createSelector(
    getAuthorState,
    fromAuthors.getAuthors
);

export const getAuthors = createSelector(
    getAuthorsEntities,
    (entities) => Object.keys(entities).map(id => entities[id])
);

export const getAuthorsLoading = createSelector(
    getAuthorState,
    fromAuthors.getLoading
);

export const getAuthorEntitySelected = createSelector(
    getAuthorState,
    fromAuthors.getSelectedAuthor
);

export const getAuthorEntityIdSelected = createSelector(
    getAuthorState,
    fromAuthors.getSelectedAuthorId
);

export const getBooksEntities = createSelector(
    getBookState,
    fromBooks.getBooks
);

export const getBooks = createSelector(
    getBooksEntities,
    (entities) => Object.keys(entities).map(id => entities[id])
);

export const getAuthorBooks = createSelector(
    getAuthorEntityIdSelected,
    getBooksEntities,
    (authorId, books) => Object.keys(books).map(key => books[key]).filter(book => book.author_id === authorId)
);

export const getAuthorBooksLoading = createSelector(
    getBookState,
    fromBooks.getLoading
);

export const getBookEntitySelected = createSelector(
    getBookState,
    fromBooks.getSelectedBook
);

export const getBookEntityIdSelected = createSelector(
    getBookState,
    fromBooks.getSelectedBookId
);