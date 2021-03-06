import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as author from '../actions/authors';

import { Author } from '../../dashboard/shared/models/author';

export interface AuthorState {
    ids: string[];
    entities: { [id: string] : Author },
    loading: boolean,
    selectedAuthorId: string | null
};

export const initialState: AuthorState = {
     ids: [],
     entities: {},
     loading: false,
     selectedAuthorId: null
}

export function authorsReducer(state = initialState, action: author.Actions): AuthorState {
    switch(action.type) {
        case author.GET: {
            return Object.assign({}, state, { loading: true });
        }
        
        case author.GET_COMPLETE: {
            const authors = action.payload;
            const newAuthors = authors.filter(author => !state.ids.includes(author.id));
            
            const newIds = newAuthors.map(author => author.id);
            
            const entities = newAuthors.reduce ((entities: { [id: string] : Author}, author) => {
                return {
                    ...entities,
                    [author.id]: author
                }
            }, { ...state.entities });
            
            return Object.assign({}, state, {
                entities,
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
            
            return {
                ids: [...state.ids, author.id],
                entities: Object.assign([], state.entities, {
                    [author.id]: author,
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
                entities: {...state.entities, [newAuthor.id]: newAuthor}, ids: [ ...state.ids, newAuthor.id] 
            });
        }

        case author.UPDATE_SUCCESS: {
            const updatedAuthor = action.payload;

            return {
                ids: state.ids,
                entities: Object.assign([], state.entities, {
                    [updatedAuthor.id]: updatedAuthor
                }),
                loading: state.loading,
                selectedAuthorId: state.selectedAuthorId
            };
        }

        case author.REMOVE_SUCCESS: {
            const authorId = action.payload;

            const newEntities = Object.keys(state.entities)
                .filter(id => id !== authorId)
                .reduce((entities: { [id: string] : Author}, id) => {
                    entities[id] = state.entities[id];
                    return entities;
                }, {});
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

export const getAuthors = (state: AuthorState) => state.entities;
export const getLoading = (state: AuthorState) =>  state.loading;
export const getSelectedAuthorId = (state: AuthorState) => state.selectedAuthorId;
export const getSelectedAuthor = (state: AuthorState) => {
    const { selectedAuthorId, entities } = state;
    const emptyAuthor = {
        id: '',
        name: '',
        about: '',
        books: 0,
        created_at: new Date()
    };
    return !selectedAuthorId ? emptyAuthor : entities[selectedAuthorId];
}
        