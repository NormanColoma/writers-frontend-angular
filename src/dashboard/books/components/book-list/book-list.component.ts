import { Component, Input } from '@angular/core';

//Models
import { Book } from '../../../shared/models/book';

@Component({
    selector: 'book-list',
    template: `
      <div *ngIf="loaded; else loading">
        <h1 class="display-4 mb-4">{{ author ? 'Books about' : 'Books'}}</h1>
        <book-resume 
          *ngFor="let book of books"
          [book]="book">
        </book-resume>
      </div>

      <ng-template #loading>
        Loading books...
      </ng-template>
    `
})

export class BookListComponent {

  loaded: boolean;

  @Input()
  books: Book[];

  @Input()
  set loading(loading: boolean) {
      this.loaded = !loading;
  };

}