import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Store relatives
import * as author from "../../../../state-store/actions/authors";
import * as authorsReducer from "../../../../state-store/reducers/authors";
import { Store } from "@ngrx/store";

//Observables and operators
import { Observable, Subscription } from 'rxjs';

//Services and Models
import { AuthorsService } from "../../../shared/services/authors/authors.service";
import { Author } from '../../../shared/models/author';

@Component({
    selector: 'author',
    template: `
        <div *ngIf="author$ | async as author; else loading;">
            <h1 class="display-4">{{ author.name ? 'Update' : 'Create' }} Author</h1>
            <author-form
                [author]="author"
                (update)="update($event)"
                (add)="add($event)">
            </author-form>
        </div>
        <ng-template #loading>Fetching author...</ng-template>
    `
})

export class AuthorComponent implements OnInit, OnDestroy {

    author$: Observable<Author>;
    loading$: Observable<boolean>;
    id: string;
    subscription: Subscription;

    constructor(
        private store: Store<authorsReducer.State>, 
        private authorsService: AuthorsService,
        private router: Router,
        private route: ActivatedRoute
    ){}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => this.id = params.id);
        this.author$ = this.store.select(authorsReducer.getSelectedAuthor);
        this.store.dispatch(new author.FindOne(this.id));        
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    async update(event: Author) {
        await this.store.dispatch(new author.UpdateAction({id: this.id, author: event}));
        this.router.navigate(['authors']);
    }

    async add(event: Author) {
        await this.store.dispatch(new author.AddAction(event));
        this.router.navigate(['authors']);
    }

}