import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//Observables and operators
import { Observable, Subscription } from 'rxjs';

//Models
import { Author } from '../../../shared/models/author';

// Store relatives
import * as author from "../../../../state-store/actions/authors";
import * as authorReducer from "../../../../state-store/reducers/authors";
import { Store } from "@ngrx/store";

@Component({
    selector: 'author-books',
    template: `<div>
        Authors books
        <author-book-list
            [author]="author$ | async">
        </author-book-list>
    </div>`,
    styleUrls: []
})

export class AuthorBooksComponent{
    author$: Observable<Author>;
    subscription: Subscription;

    constructor(private store: Store<authorReducer.State>, private route: ActivatedRoute){
        this.author$ = this.store.select(authorReducer.getSelectedAuthor);
        this.subscription = this.route.params.subscribe(params => this.store.dispatch(new author.SelectOne(params.id)));
    }
}