import { Component } from '@angular/core';
import { Observable } from 'rxjs';

//Service and models
import { Book } from '../../../shared/models/book';
import { BookService } from '../../../shared/services/books/books.service';

//ngrx
import { Store } from '@ngrx/store';
import * as book from "../../../../state-store/actions/books";
import * as bookReducer from "../../../../state-store/reducers/books"; 

@Component({
    selector: 'books',
    template: `
        <div>
            <book-list 
                [books]="books$ | async"
                [loading]="loading$ | async"
                class="mt-5">
            </book-list>
        </div>
    `
})

export class BooksComponent {
    books$: Observable<Book[]>;
    loading$: Observable<boolean>;

    constructor(private store: Store<bookReducer.BookState>, private bookService: BookService){
        this.store.dispatch(new book.GetAction());
    }

    ngOnInit() {
        this.books$ = this.store.select(bookReducer.getBooks);
        this.loading$ = this.store.select(bookReducer.getLoading);
    }
}