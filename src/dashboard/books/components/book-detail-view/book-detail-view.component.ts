import { Component, Input } from '@angular/core';

//Models 
import { Book } from '../../../shared/models/book';

@Component({
    selector: 'book-detail-view',
    template: `<div>
        <h2> {{ book.title }} </h2>
    </div>`
})

export class BookDetailViewComponent {
    @Input()
    book: Book;
}