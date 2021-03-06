import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//Observables and operators
import { Observable, Subscription } from 'rxjs';

//Models
import { Author } from '../../../shared/models/author';
import { Book } from '../../../shared/models/book';

// Store relatives
import * as author from "../../../../state-store/actions/authors";
import * as book from "../../../../state-store/actions/books";
import * as fromStore from "../../../../state-store/reducers";
import * as selectors from "../../../../state-store/selectors";

import { Store } from "@ngrx/store";

@Component({
    selector: 'author-books',
    template: `<div>
        <author-book-list
            [author]="author$ | async"
            [books]="books$ | async"
            [loading]="loading$ | async">
        </author-book-list>
    </div>`,
    styleUrls: []
})

export class AuthorBooksComponent{
    author$: Observable<Author>;
    books$: Observable<Book[]>;
    loading$: Observable<boolean>;
    subscription: Subscription;

    constructor(private store: Store<fromStore.CollectionState>, private route: ActivatedRoute){
        this.author$ = this.store.select(selectors.getAuthorEntitySelected);
        this.books$ = this.store.select(selectors.getAuthorBooks);
        this.loading$ = this.store.select(selectors.getAuthorBooksLoading);
    }
}