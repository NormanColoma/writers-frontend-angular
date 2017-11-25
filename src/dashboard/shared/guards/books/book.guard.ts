import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';

import * as book from "../../../../state-store/actions/books";
import * as author from "../../../../state-store/actions/authors";
import { AuthorState, getBookEntitySelected } from "../../../../state-store/reducers";

import { Book } from '../../models/book';


@Injectable()
export class BookGuard implements CanActivate {
  constructor(private store: Store<AuthorState>) {}

  getFromStoreOrAPI(bookId: string): Observable<Book> {
    return this.store
      .select(getBookEntitySelected)
      .do((bookFetched: Book) => {
        if (!bookFetched || bookFetched.id === "") {
          this.store.dispatch(new book.FindOneAction(bookId));
        } else {
          this.store.dispatch(new author.FindOne(bookFetched.author_id));
        }
      })
      .filter((it: any) => it)
      .take(1)
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    this.store.dispatch(new book.SelectOneAction(route.params.id));
    return this.getFromStoreOrAPI(route.params.id)
      .switchMap(() => of(true))
      .catch(() => of(false));
  }
}