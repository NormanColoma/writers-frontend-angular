import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as author from '../actions/authors';

import { Author } from '../../dashboard/shared/models/author';

export interface State {
    ids: string[];
    entities: Author [],
    loading: boolean,
    selectedAuthorId: string | null
};

export const initialState: State = {
     ids: [],
     entities: [],
     loading: false,
     selectedAuthorId: null
}

export function authorsReducer(state = initialState, action: author.Actions): State {
    switch(action.type) {
        case author.GET: {
            return Object.assign({}, state, { loading: true });
        }
        
        case author.GET_COMPLETE: {
            const authors = action.payload;
            const newAuthors = authors.filter(author => !state.ids.includes(author.id));
            
            const newIds = newAuthors.map(author => author.id);
            
            
            return Object.assign({}, state, {
                entities: [...state.entities, ...newAuthors],
                ids: [...state.ids, ...newIds],
                loading: false
            });
        }
        
        case author.FIND_ONE:
        case author.SELECT_ONE: {
            return Object.assign({}, state, { loading: true, selectedAuthorId: action.payload });
        }

        case author.FIND_ONE_COMPLETE: {
            const author = action.payload;
            
            if (!author.name || state.ids.indexOf(author.id) > -1) {
                return state;
            }

            const currentIndex = state.entities
                .findIndex(entity => entity.id === author.id);
            const index = currentIndex >= 0 ? currentIndex : 0;
            return {
                ids: [...state.ids, author.id],
                entities: Object.assign([], state.entities, {
                    [index]: author,
                }),
                loading: false,
                selectedAuthorId: state.selectedAuthorId,
            };
        }

        case author.ADD_SUCCESS: {
            const newAuthor = action.payload;

            if(state.ids.indexOf(newAuthor.id) >= 0) {
                return state;
            }

            return Object.assign({}, state, { 
                entities: [...state.entities, newAuthor], ids: [ ...state.ids, newAuthor.id] 
            });
        }

        case author.UPDATE_SUCCESS: {
            const updatedAuthor = action.payload;
            const index = state.entities
                .findIndex(entity => entity.id === updatedAuthor.id);

            return {
                ids: state.ids,
                entities: Object.assign([], state.entities, {
                    [index]: updatedAuthor
                }),
                loading: state.loading,
                selectedAuthorId: state.selectedAuthorId
            };
        }

        case author.REMOVE_SUCCESS: {
            const authorId = action.payload;

            const newEntities = state.entities.filter(author => author.id !== authorId); 
            const newIds = state.ids.filter(id => id !== authorId);

            return Object.assign({}, state, {
                entities: newEntities,
                ids: newIds
            });
        }

        default: {
            return state;
        }
    }
}

export const getAuthorsState = createFeatureSelector<State>('authors');

export const getAuthors = createSelector(
    getAuthorsState,
    (state: State) => state.entities
);

export const getLoading = createSelector(
    getAuthorsState,
    (state: State) =>  state.loading
)

export const getSelectedAuthorId = createSelector(
    getAuthorsState,
    (state: State) => state.selectedAuthorId
)

export const getSelectedAuthor = createSelector(
    getAuthors,
    getSelectedAuthorId,
    (authors, id) => {
        if(!id) {
            return {
                id: '',
                name: '',
                about: '',
                books: 0,
                created_at: new Date()
            };
        }
        return authors.find(author => author.id === id);
    }
);