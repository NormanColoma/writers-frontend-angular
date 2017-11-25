import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Author } from '../../../shared/models/author';
import { Book } from '../../../shared/models/book';

@Component({
    selector: 'author-book-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./author-book-list.component.scss'],
    template: `<div>
        <div *ngIf="loaded; else loading;">
            <div *ngIf="books.length; else empty;">
                <h1 class="display-4 mb-4">Books of {{ author.name }}</h1>
                <div class="media" *ngFor="let book of books">
                    <div class="media-body">
                        <h5 class="mt-0 mb-1">{{ book.title }}</h5>
                        <hr>
                        <div>{{ book.description }}</div>
                        <div class="w-30 mt-4 d-flex justify-content-between">
                            <a href="#" class="btn btn-outline-primary btn-bordered float-right">Want to read</a>
                        </div>
                    </div>
                    <img class="ml-3 mt-5 w-15 image-shadow" src="{{ book.coverUrl }}" alt="Generic placeholder image">
                </div>
                <div class="bd-callout bd-callout-info">
                    <h4 class="text-dark">Didn't find what you were looking for??</h4>
                    <p>
                        So the book you've been looking for all this time about  
                        <strong>{{ author.name }}</strong> isn't here. Don't wait more, let's 
                        <a [routerLink]="addBookLink">add</a> it!!
                    </p>
                </div>
            </div>
            <ng-template #empty>
                <div>
                    <h4 class="text-dark">Ups we couldn't retrieve anything</h4>
                    <p>There are no books about <strong>{{ author.name }}</strong> yet. Try <a href="/">adding</a> one!!</p>
                </div>
                
            </ng-template>
       </div>
       <ng-template #loading>
            {{ loadingMessage }}
       </ng-template>
    </div>`
})

export class AuthorBookListComponent {
    loaded: boolean;
    @Input()
    author: Author;

    @Input()
    books: Book[];

    @Input()
    set loading(loading: boolean) {
        this.loaded = !loading;
    };

    get loadingMessage() {
        return this.author ? `Loading books about ${this.author.name}...` : 'Loading books and author...';
    }

    get addBookLink() {
        return ['/books/new'];
    }
}