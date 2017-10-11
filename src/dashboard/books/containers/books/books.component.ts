import { Component } from '@angular/core';

@Component({
    selector: 'books',
    template: `
        <div>
            Books
            <book-list></book-list>
        </div>
    `
})

export class BooksComponent {}