import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';

import * as author from "../../../../state-store/actions/authors";
import { State, getAuthors } from "../../../../state-store/reducers/authors";

import { Author } from '../../models/author';

@Injectable()
export class AuthorsGuard implements CanActivate {
  constructor(private store: Store<State>) {}

  getFromStoreOrAPI(): Observable<Author[]> {
    return this.store
      .select(getAuthors)
      .do((authors: Author []) => {
        if (!authors.length || authors.length === 0) {
          this.store.dispatch(new author.GetAction);
        }
      })
      .filter((authors: any) => authors.length)
      .take(1);
  }

  canActivate(): Observable<boolean> {
    return this.getFromStoreOrAPI()
      .switchMap(() => of(true))
      .catch(() => of(false));
  }
}