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
import * as authorReducer from "../../../../state-store/reducers";

import { Store } from "@ngrx/store";

@Component({
    selector: 'author-books',
    template: `<div>
        Authors books
        <author-book-list
            [author]="author$ | async"
            [books]="books$ | async">
        </author-book-list>
    </div>`,
    styleUrls: []
})

export class AuthorBooksComponent{
    author$: Observable<Author>;
    books$: Observable<Book[]>;
    subscription: Subscription;

    constructor(private store: Store<authorReducer.AuthorState>, private route: ActivatedRoute){
        this.author$ = this.store.select(authorReducer.getAuthorEntitySelected);
        this.books$ = this.store.select(authorReducer.getAuthorBooks);

        this.subscription = this.route.params
            .subscribe(params => { 
                this.store.dispatch(new author.SelectOne(params.id));
                this.store.dispatch(new book.GetByAuthorAction(params.id));
            });
    }
}