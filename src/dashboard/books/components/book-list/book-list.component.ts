import { Component, Input } from '@angular/core';

//Models
import { Book } from '../../../shared/models/book';

@Component({
    selector: 'book-list',
    template: `
      <book-resume 
        *ngFor="let book of books"
        [book]="book">
      </book-resume>
    `
})

export class BookListComponent {

  @Input()
  books: Book[];
}