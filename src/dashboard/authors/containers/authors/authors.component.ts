import { Component, OnInit } from '@angular/core';

// Store relatives
import * as author from "../../../../state-store/actions/authors";
import * as authorReducer from "../../../../state-store/reducers/authors";
import { Store } from "@ngrx/store";

//Observables and operators
import { Observable } from 'rxjs';

//Services and Models
import { AuthorsService } from "../../../shared/services/authors/authors.service";
import { Author } from '../../../shared/models/author';

@Component({
    selector: 'authors',
    template: `
       <author-list
        [authors]="authors$ | async"
        [loading]="loading$ | async"
        (remove)="remove($event)">
       </author-list>
    `
})

export class AuthorsComponent implements OnInit {

    authors$: Observable<Author[]>;
    loading$: Observable<boolean>;

    constructor(private store: Store<authorReducer.State>, private authorsService: AuthorsService){
        this.store.dispatch(new author.GetAction);
    }
    
    ngOnInit() {
        this.loading$ = this.store.select(authorReducer.getLoading);
        this.authors$ = this.store.select(authorReducer.getAuthors);
    }

    remove(id: string) {
        this.store.dispatch(new author.RemoveAction(id));
    }
}

