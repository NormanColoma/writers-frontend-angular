import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

//Models 
import { Author } from '../../../shared/models/author';
import { Book } from '../../../shared/models/book';

// Store relatives
import * as author from "../../../../state-store/actions/authors";
import * as book from "../../../../state-store/actions/books";
import * as booksReducer from "../../../../state-store/reducers/books";
import * as authorsReducer from "../../../../state-store/reducers";
import { Store } from "@ngrx/store";

import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'book',
    template: `<div>
        <h1 class="display-4 mb-4">{{ book$ ? 'Update' : 'Add' }} Book</h1>
        <book-form
            [authors]="authors$ | async"
            [book]="book$ | async"
            (add)="add($event)">
        </book-form>
    </div>`
})

export class BookComponent implements OnDestroy {

    subscription: Subscription;
    authors$: Observable<Author[]>;
    book$: Observable<Book>;

    constructor(private store: Store<authorsReducer.AuthorState>, private router: Router, private route: ActivatedRoute){
        this. subscription = Observable.zip(
            this.route.params,
            this.store.select(authorsReducer.getBooksEntities)
        ).subscribe(([params, books]) => {
            if(!params.id) {
                this.authors$ = this.store.select(authorsReducer.getAuthorsEntities);
                this.store.dispatch(new author.GetAction());
            } else {
                this.book$ = this.store.select(authorsReducer.getBookEntitySelected);
                this.store.dispatch(new book.SelectOneAction(params.id));
                if(books.length === 0) {
                    this.store.dispatch(new book.FindOneAction(params.id));
                } 
            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    async add(event: Book) {
        await this.store.dispatch(new book.AddAction(event));
        this.router.navigate(['books']);
    }
}