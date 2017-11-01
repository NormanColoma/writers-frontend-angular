import { Action } from '@ngrx/store';

import { Book } from '../../dashboard/shared/models/book';

export const GET = '[Book] Get';
export const GET_COMPLETE = '[Book] Get Complete';
export const GET_BY_AUTHOR = '[Book] Get By Author'
export const GET_BY_AUTHOR_COMPLETE = '[Book] Get By Author Complete'

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


export type Actions = GetAction 
    | GetCompleteAction
    | GetByAuthorAction
    | GetByAuthorCompleteAction;