import { Injectable } from '@angular/core';

//Store relatives
import * as book from "../actions/books";
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';

//Observables and operators
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

//Services and Models
import { BookService } from '../../dashboard/shared/services/books/books.service';
import { Book } from '../../dashboard/shared/models/book';

type Props = { book: Book, id: string};

@Injectable() 
export class BookEffects {

    constructor(
        private actions$: Actions,
        private bookService: BookService,
    ){}
    
    @Effect()
    get$: Observable<book.GetCompleteAction> = this.actions$
        .ofType(book.GET)
        .switchMap(() => this.bookService.getBooks())
        .map((books: Book[]) => new book.GetCompleteAction(books));

    @Effect()
    getByAuthor$: Observable<book.GetByAuthorCompleteAction> = this.actions$
        .ofType(book.GET_BY_AUTHOR)
        .map((action: book.GetByAuthorAction) => action.payload)
        .switchMap(id => 
            this.bookService
                .getByAuthor(id)
                .map((books : Book[])  => { 
                    debugger;
                    return new book.GetByAuthorCompleteAction(books)
                })
        );

}