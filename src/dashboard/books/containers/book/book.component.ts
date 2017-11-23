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
import { debounce } from 'rxjs/operator/debounce';

@Component({
    selector: 'book',
    template: `<div>
        <h1 class="display-4 mb-4">{{ book$ ? 'Edit' : 'Add' }} Book</h1>
        <book-form
            [authors]="authors$ | async"
            [book]="book$ | async"
            (add)="add($event)"
            (edit)="edit($event)">
        </book-form>
    </div>`
})

export class BookComponent implements OnDestroy {

    subscription: Subscription;
    authors$: Observable<Author[]>;
    book$: Observable<Book>;
    bookId: string;


    constructor(private store: Store<authorsReducer.AuthorState>, private router: Router, private route: ActivatedRoute){
        this. subscription = Observable.zip(
            this.route.params,
            this.store.select(authorsReducer.getBooksEntities)
        )
        .do(([params]) => {
            if(params.id) {
                this.bookId = params.id;
                this.selectBookFromStore(params.id);
            } 
        })
        .map(([params, books]) => { 
            const authorId = params.id ? params.id : null;
            return { authorId, books };
         })
        .subscribe(({authorId, books}) => {
            this.selectAuthorsFromStore();
            if(books.length === 0) {
                this.store.dispatch(new book.FindOneAction(authorId));
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
    
    async edit(event: Book) {
        await this.store.dispatch(new book.EditAction({id: this.bookId, book: event}));
        this.router.navigate(['books']);
    }

    private selectAuthorsFromStore() {
        this.store.dispatch(new author.GetAction());
        this.authors$ = this.store.select(authorsReducer.getAuthorsEntities);
    }

    private selectBookFromStore(bookId: string) {
        this.book$ = this.store.select(authorsReducer.getBookEntitySelected);
        this.store.dispatch(new book.SelectOneAction(bookId));
    }
}