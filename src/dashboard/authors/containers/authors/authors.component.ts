import { Component, OnInit } from '@angular/core';

// Store relatives
import * as author from "../../../../state-store/actions/authors";
import * as fromStore from "../../../../state-store/reducers";
import * as selectors from "../../../../state-store/selectors";
import { Store } from "@ngrx/store";

//Observables and operators
import { Observable } from 'rxjs';

//Models
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

    constructor(private store: Store<fromStore.CollectionState>){
        this.store.dispatch(new author.GetAction);
    }
    
    ngOnInit() {
        this.loading$ = this.store.select(selectors.getAuthorsLoading);
        this.authors$ = this.store.select(selectors.getAuthors);
    }

    remove(id: string) {
        this.store.dispatch(new author.RemoveAction(id));
    }
}

