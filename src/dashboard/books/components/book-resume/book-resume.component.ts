import { Component, Input } from '@angular/core';

//Models
import { Book } from '../../../shared/models/book';

@Component({
    selector: 'book-resume',
    template: `
        <div class="card card-container mb-3 d-flex flex-row">
            <div class="w-25">
                <img class="card-img-left h-100 w-100" src="{{ book.coverUrl }}" alt="Card image cap">
            </div>
            <div class="card-block w-75">
                <h4 class="card-title">{{ book.title }}</h4>
                <p class="card-text">{{ book.description }}</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                <a href="#" class="btn btn-primary float-right">View more</a>
            </div>
        </div>
    `,
    styleUrls: ['./book-resume.component.scss']
})

export class BookResumeComponent { 
    @Input()
    book: Book;
}