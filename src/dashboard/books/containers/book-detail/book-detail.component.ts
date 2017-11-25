import { Component } from '@angular/core';
import { Router } from '@angular/router';

//Models 
import { Author } from '../../../shared/models/author';
import { Book } from '../../../shared/models/book';

import { Observable } from 'rxjs';

import * as authorsReducer from "../../../../state-store/reducers";
import { Store } from "@ngrx/store";

@Component({
    selector: 'book-detail',
    template: `<div>
        <book-detail-view
            [book]="book$ | async">
        </book-detail-view>
    </div>`
})

export class BookDetailComponent{
    book$: Observable<Book>;
    constructor(private store: Store<authorsReducer.AuthorState>, private router: Router) {
        this.book$ = this.store.select(authorsReducer.getBookEntitySelected);
    }
}