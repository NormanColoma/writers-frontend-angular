import { Action } from '@ngrx/store';

import { Author } from '../../dashboard/shared/models/author';

export const GET = '[Author] Get';
export const GET_COMPLETE = '[Author] Get Complete';
export const ADD = '[Author] Add';
export const ADD_SUCCESS = '[Author] Add Success';
export const SELECT_ONE = '[Author] Select One';
export const FIND_ONE = '[Author] Find One';
export const FIND_ONE_COMPLETE = '[Author] Find One Complete';
export const UPDATE = '[Author] Update';
export const UPDATE_SUCCESS = '[Author] Update Success';
export const REMOVE = '[Author] Remove';
export const REMOVE_SUCCESS = '[Author] Remove Success';

export class GetAction implements Action {
    readonly type = GET;
}

export class GetCompleteAction implements Action {
    readonly type = GET_COMPLETE;

    constructor(public payload: Author[]) { }
}

export class AddAction implements Action {
    readonly type = ADD;

    constructor(public payload: Author) { }
}

export class AddActionSuccess implements Action {
    readonly type = ADD_SUCCESS;

    constructor(public payload: Author) { }
}

export class SelectOne implements Action {
    readonly type = SELECT_ONE;

    constructor(public payload: string) { }
}

export class FindOne implements Action {
    readonly type = FIND_ONE;

    constructor(public payload: string) { }
}

export class FindOneComplete implements Action {
    readonly type = FIND_ONE_COMPLETE;
    
    constructor(public payload: Author) { }
}

export class UpdateAction implements Action {
    readonly type = UPDATE;

    constructor(public payload: { id: string, author: Author }) { }
}

export class UpdateActionSuccess implements Action {
    readonly type = UPDATE_SUCCESS;

    constructor(public payload: Author) { }
}

export class RemoveAction implements Action {
    readonly type = REMOVE;

    constructor(public payload: string) { }
}

export class RemoveActionSuccess implements Action {
    readonly type = REMOVE_SUCCESS;

    constructor(public payload: string) { }
}


export type Actions
= GetAction
| GetCompleteAction
| AddAction
| AddActionSuccess
| SelectOne
| FindOne
| FindOneComplete
| UpdateAction
| UpdateActionSuccess
| RemoveAction
| RemoveActionSuccess;