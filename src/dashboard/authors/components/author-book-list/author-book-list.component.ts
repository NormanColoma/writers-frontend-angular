import { Component, Input } from '@angular/core';

import { Author } from '../../../shared/models/author';

@Component({
    selector: 'author-book-list',
    template: `<div>
        <h1 class="display-4 mb-4">Books of {{ author.name }}</h1>
    </div>`
})

export class AuthorBookListComponent {
    @Input()
    author: Author;
}