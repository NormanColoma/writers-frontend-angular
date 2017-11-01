import { Component, Input } from '@angular/core';

import { Author } from '../../../shared/models/author';
import { Book } from '../../../shared/models/book';

@Component({
    selector: 'author-book-list',
    styleUrls: ['./author-book-list.component.scss'],
    template: `
    <div>
        <h1 class="display-4 mb-4">Books of {{ author.name }}</h1>
        <div class="media" *ngFor="let book of books">
            <div class="media-body">
                <h5 class="mt-0 mb-1">{{ book.title }}</h5>
                <hr>
                <div>{{ book.description }}</div>
                <div class="w-30 mt-4 d-flex justify-content-between">
                    <a href="#" class="btn btn-primary float-right">Want to read</a>
                </div>
            </div>
            <img class="ml-3 mt-5 w-15 image-shadow" src="{{ book.coverUrl }}" alt="Generic placeholder image">
       </div>
    </div>`
})

export class AuthorBookListComponent {
    @Input()
    author: Author;

    @Input()
    books: Book[];
}