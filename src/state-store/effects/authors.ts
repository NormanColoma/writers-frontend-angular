import { Injectable } from '@angular/core';

//Store relatives
import * as author from "../actions/authors";
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';

//Observables and operators
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

//Services and Models
import { AuthorsService } from '../../dashboard/shared/services/authors/authors.service';
import { Author } from '../../dashboard/shared/models/author';

type Props = { author: Author, id: string};

@Injectable() 
export class AuthorEffects {

    constructor(
        private actions$: Actions,
        private authorsService: AuthorsService,
    ){}
    
    @Effect()
    get$: Observable<author.GetCompleteAction> = this.actions$
        .ofType(author.GET)
        .switchMap(() => this.authorsService.getAuthors())
        .map((authors: Author[]) => new author.GetCompleteAction(authors));


    @Effect()
    findOne$: Observable<author.FindOneComplete> = this.actions$
        .ofType(author.FIND_ONE)
        .map((action: author.FindOne) => action.payload)
        .mergeMap(id => 
            this.authorsService
                .getAuthor(id)
                .map((auth : Author) => new author.FindOneComplete(auth))
        );
    
    @Effect()
    update$: Observable<author.UpdateActionSuccess> = this.actions$
        .ofType(author.UPDATE)
        .map((action: author.UpdateAction) => action.payload)
        .mergeMap(values =>
            this.authorsService
                .updateAuthor(values.id, values.author)
                .map((auth : Author) => new author.UpdateActionSuccess(auth))
        );

    @Effect()
    add$: Observable<author.AddActionSuccess> = this.actions$
        .ofType(author.ADD)
        .map((action: author.AddAction) => action.payload)
        .mergeMap(authorToBeAdded => 
            this.authorsService
                .addAuthor(authorToBeAdded)
                .map((auth : Author) => new author.AddActionSuccess(auth))
        );

    @Effect()
    remove$: Observable<author.RemoveActionSuccess> = this.actions$
        .ofType(author.REMOVE)
        .map((action: author.RemoveAction) => action.payload)
        .mergeMap(indexOfAuthor => 
            this.authorsService
                .removeAuthor(indexOfAuthor)
                .map((index: string) => new author.RemoveActionSuccess(index))
        );
}   
