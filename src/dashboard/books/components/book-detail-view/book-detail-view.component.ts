import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

//Models 
import { Book } from '../../../shared/models/book';
import { Author } from '../../../shared/models/author';

@Component({
    selector: 'book-detail-view',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./book-detail-view.component.scss'],
    template: `<div>
        <div class="book-title">
            <h4> {{ book.title }} </h4>
            <small class="text-muted">{{ nameOfAuthor }}</small>
        </div>
        <div class="book-body mt-3">
            <img src="{{ book.coverUrl }}" class="rounded float-left w-17 mr-4">
            <p class="text-justify"> {{ book.description }}</p>
            <a class="btn btn-outline-primary btn-bordered" href="#">Want to read</a>
        </div>
    </div>`
})

export class BookDetailViewComponent {
    @Input()
    private book: Book;

    @Input()
    private author: Author;

    get nameOfAuthor() {
        if (this.author && this.author.name) {
            return `Written by ${this.author.name}`;
        }
        return `Unknown author`;
    }
}