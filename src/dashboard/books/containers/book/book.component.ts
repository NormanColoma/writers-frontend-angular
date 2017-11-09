import { Component } from '@angular/core';

//Models 
import { Author } from '../../../shared/models/author';

// Store relatives
import * as author from "../../../../state-store/actions/authors";
import * as booksReducer from "../../../../state-store/reducers/books";
import * as authorsReducer from "../../../../state-store/reducers";
import { Store } from "@ngrx/store";

import { Observable } from 'rxjs';

@Component({
    selector: 'book',
    template: `<div>
        We're going to add new book
        <book-form
            [authors]="authors$ | async">
        </book-form>
    </div>`
})

export class BookComponent{

    authors$: Observable<Author[]>;

    constructor(private store: Store<authorsReducer.AuthorState>){
        this.authors$ = this.store.select(authorsReducer.getAuthorsEntities);
        this.store.dispatch(new author.GetAction());
    }
}