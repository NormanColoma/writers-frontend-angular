import { createSelector } from '@ngrx/store';
import { getBooksEntities } from './books';
import * as fromFeature from '../reducers';
import * as fromAuthors from '../reducers/authors';

export const getAuthorState = createSelector(
    fromFeature.getCollectionState,
    (state: fromFeature.CollectionState) => state.authors
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

export const getAuthorBooks = createSelector(
    getAuthorEntityIdSelected,
    getBooksEntities,
    (authorId, books) => Object.keys(books).map(key => books[key]).filter(book => book.author_id === authorId)
);