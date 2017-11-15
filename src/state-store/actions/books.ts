import { Action } from '@ngrx/store';

import { Book } from '../../dashboard/shared/models/book';

export const GET = '[Book] Get';
export const GET_COMPLETE = '[Book] Get Complete';
export const GET_BY_AUTHOR = '[Book] Get By Author'
export const GET_BY_AUTHOR_COMPLETE = '[Book] Get By Author Complete'
export const ADD = '[Book] Add'
export const ADD_SUCCESS = '[Book] Add Success'
export const EDIT = '[Book] EDIT'
export const EDIT_SUCCESS = '[Book] Edit Success'
export const SELECT_ONE = '[Book] Select One';
export const FIND_ONE = '[Book] Find One';
export const FIND_ONE_COMPLETE = '[Book] Find One Complete';

export class GetAction implements Action {
    readonly type = GET;
}

export class GetCompleteAction implements Action {
    readonly type = GET_COMPLETE;

    constructor(public payload: Book[]) { }
}

export class GetByAuthorAction implements Action {
    readonly type = GET_BY_AUTHOR;

    constructor(public payload: string) {}
}

export class GetByAuthorCompleteAction implements Action {
    readonly type = GET_BY_AUTHOR_COMPLETE;

    constructor(public payload: Book[]) { }
}

export class AddAction implements Action {
    readonly type = ADD;

    constructor(public payload: Book) {}
}
export class AddActionSuccess implements Action {
    readonly type = ADD_SUCCESS;

    constructor(public payload: Book) {}
}

export class EditAction implements Action {
    readonly type = EDIT;

    constructor(public payload: { id: string, book: Book }) {}
}
export class EditActionSuccess implements Action {
    readonly type = EDIT_SUCCESS;

    constructor(public payload: Book) {}
}

export class SelectOneAction implements Action {
    readonly type = SELECT_ONE;

    constructor(public payload: string) {}
}

export class FindOneAction implements Action {
    readonly type = FIND_ONE;

    constructor(public payload: string) {}
}

export class FindOneCompleteAction implements Action {
    readonly type = FIND_ONE_COMPLETE;

    constructor(public payload: Book) {}
}


export type Actions = GetAction 
    | GetCompleteAction
    | GetByAuthorAction
    | GetByAuthorCompleteAction
    | AddAction
    | AddActionSuccess
    | SelectOneAction
    | FindOneAction
    | FindOneCompleteAction
    | EditAction
    | EditActionSuccess;