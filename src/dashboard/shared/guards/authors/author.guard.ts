import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';

import * as author from "../../../../state-store/actions/authors";
import * as book from "../../../../state-store/actions/books";
import { State, getSelectedAuthor } from "../../../../state-store/reducers/authors";

import { Author } from '../../models/author';


@Injectable()
export class AuthorBooksGuard implements CanActivate {
  constructor(private store: Store<State>) {}

  getFromStoreOrAPI(authorId: string): Observable<Author> {
    return this.store
      .select(getSelectedAuthor)
      .do((authorFetched: Author) => {
        if (authorFetched.id === "") {
          this.store.dispatch(new author.FindOne(authorId));
          this.store.dispatch(new book.GetByAuthorAction(authorId));
        } else {
            this.store.dispatch(new book.GetByAuthorAction(authorId));
        }
      })
      .filter((author: any) => author)
      .take(1);
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    this.store.dispatch(new author.SelectOne(route.params.id));
    return this.getFromStoreOrAPI(route.params.id)
      .switchMap(() => of(true))
      .catch(() => of(false));
  }
}