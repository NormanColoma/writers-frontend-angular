import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

//Containers
import { BooksComponent } from  './containers/books/books.component';

//Components
import { BookListComponent } from './components/book-list/book-list.component';

const ROUTES: Routes = [
    { path: '', component:  BooksComponent }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES)
    ],
    declarations: [ 
        BooksComponent,
        BookListComponent
    ]
})

export class BooksModule{}