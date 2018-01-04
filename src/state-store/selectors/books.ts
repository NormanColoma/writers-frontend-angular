import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromBooks from '../reducers/books';

export const getBookState = createSelector(
    fromFeature.getCollectionState,
    (state: fromFeature.CollectionState) => state.books
);

export const getBooksEntities = createSelector(
    getBookState,
    fromBooks.getBooks
);

export const getBooks = createSelector(
    getBooksEntities,
    (entities) => Object.keys(entities).map(id => entities[id])
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