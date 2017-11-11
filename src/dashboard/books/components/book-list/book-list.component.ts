import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

//Models
import { Book } from '../../../shared/models/book';

@Component({
    selector: 'book-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
      <div *ngIf="loaded; else loading">
        <h1 class="display-4 mb-4">{{ author ? 'Books about' : 'Books'}}</h1>
        <book-resume 
          *ngFor="let book of books"
          [book]="book">
        </book-resume>
        <a
          class="btn btn-link"
          [routerLink]="addBookLink">
          Add new one
        </a>
      </div>

      <ng-template #loading>
        Loading books...
      </ng-template>
    `,
    styleUrls: ['./book-list.component.scss']
})

export class BookListComponent {

  loaded: boolean;

  @Input()
  books: Book[];

  @Input()
  set loading(loading: boolean) {
      this.loaded = !loading;
  };

  get addBookLink() {
    return ['/books/new'];
  }
}