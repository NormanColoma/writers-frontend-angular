import { Component } from '@angular/core';
import { Router } from '@angular/router';

//Models 
import { Author } from '../../../shared/models/author';
import { Book } from '../../../shared/models/book';

import { Observable } from 'rxjs';

import * as fromStore from "../../../../state-store/reducers";
import * as author from "../../../../state-store/actions/authors";
import { Store } from "@ngrx/store";

@Component({
    selector: 'book-detail',
    template: `<div>
        <book-detail-view
            [book]="book$ | async"
            [author]="author$ | async">
        </book-detail-view>
    </div>`
})

export class BookDetailComponent{
    private book$: Observable<Book>;
    private author$: Observable<Author>;
    
    
    constructor(private store: Store<fromStore.CollectionState>) {
        this.book$ = this.store.select(fromStore.getBookEntitySelected);
        this.author$ = this.store.select(fromStore.getAuthorEntitySelected);
    }
}