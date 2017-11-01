import { Component, Input } from '@angular/core';

import { Author } from '../../../shared/models/author';
import { Book } from '../../../shared/models/book';

@Component({
    selector: 'author-book-list',
    template: `<div>
        <h1 class="display-4 mb-4">Books of {{ author.name }}</h1>
        <div *ngFor="let book of books">
            {{ book.title }}
        </div>
    </div>`
})

export class AuthorBookListComponent {
    @Input()
    author: Author;

    @Input()
    books: Book[];
}