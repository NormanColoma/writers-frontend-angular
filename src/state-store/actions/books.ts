import { Action } from '@ngrx/store';

import { Book } from '../../dashboard/shared/models/book';

export const GET = '[Book] Get';
export const GET_COMPLETE = '[Book] Get Complete';

export class GetAction implements Action {
    readonly type = GET;
}

export class GetCompleteAction implements Action {
    readonly type = GET_COMPLETE;

    constructor(public payload: Book[]) { }
}

export type Actions = GetAction 
    | GetCompleteAction;