import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

//Models
import { Book } from '../../../shared/models/book';

@Component({
    selector: 'book-resume',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="card card-container mb-3 d-flex flex-row">
            <div class="w-25">
                <img class="card-img-left h-100 w-100" src="{{ book.coverUrl }}" alt="Card image cap">
            </div>
            <div class="card-block w-75">
                <h4 class="card-title">{{ book.title }}</h4>
                <p class="card-text">{{ book.description }}</p>
                <p class="card-text"><small class="text-muted">Last updated {{ book.updated | date: 'MMM d, y, h:mm:ss a' }}</small></p>
                <a [routerLink]="book.id" class="btn btn-outline-primary btn-bordered float-right ml-2">Edit info</a>
                <a [routerLink]="linkToDetails" class="btn btn-outline-primary btn-bordered float-right">View more</a>
            </div>
        </div>
    `,
    styleUrls: ['./book-resume.component.scss']
})

export class BookResumeComponent { 
    @Input()
    book: Book;

    get linkToDetails() {
        return `${this.book.id}/details`;
    }
}