import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'author-list',
    template: `
        <div *ngIf="loaded || authors.length">

            <div *ngIf="authors.length">
                <h1 class="display-4 mb-4">Authors</h1>
                <author-resume 
                    *ngFor="let author of authors;"
                    [author]="author"
                    (remove)="removeAuthor($event)">
                </author-resume>
            </div>

            <div *ngIf="showEmptyResultsMessage">
                There are no authors added yet, add one!!
            </div>
        
            <a
                class="btn btn-link"
                [routerLink]="createAuthorLink">
                Create new one
            </a>

        </div>

        <div *ngIf="!loaded">
            {{ authors.length <= 0 ? 'Fetching authors...' : 'Fetching new authors...' }}
        </div>

    `
})

export class AuthorListComponent {

    loaded: boolean;

    @Input() 
    authors: any [];

    @Input()
    set loading(loading: boolean) {
        this.loaded = !loading;
    };

    @Output()
    remove = new EventEmitter<String>();

    get showEmptyResultsMessage() {
        return this.authors.length === 0 && this.loaded;
    }

    get createAuthorLink() {
        return ['../authors/new'];
    }

    removeAuthor(id: string) {
        this.remove.emit(id);
    }
}