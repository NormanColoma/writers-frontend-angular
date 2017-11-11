import { Component } from '@angular/core';
import { Router } from '@angular/router';

//Models 
import { Author } from '../../../shared/models/author';
import { Book } from '../../../shared/models/book';

// Store relatives
import * as author from "../../../../state-store/actions/authors";
import * as book from "../../../../state-store/actions/books";
import * as booksReducer from "../../../../state-store/reducers/books";
import * as authorsReducer from "../../../../state-store/reducers";
import { Store } from "@ngrx/store";

import { Observable } from 'rxjs';

@Component({
    selector: 'book',
    template: `<div>
        <book-form
            [authors]="authors$ | async"
            (add)="add($event)">
        </book-form>
    </div>`
})

export class BookComponent{

    authors$: Observable<Author[]>;

    constructor(private store: Store<authorsReducer.AuthorState>, private router: Router){
        this.authors$ = this.store.select(authorsReducer.getAuthorsEntities);
        this.store.dispatch(new author.GetAction());
    }

    async add(event: Book) {
        await this.store.dispatch(new book.AddAction(event));
        this.router.navigate(['books']);
    }
}