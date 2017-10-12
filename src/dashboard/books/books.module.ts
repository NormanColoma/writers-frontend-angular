import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

//Containers
import { BooksComponent } from  './containers/books/books.component';

//Components
import { BookListComponent } from './components/book-list/book-list.component';
import { BookResumeComponent } from './components/book-resume/book-resume.component';

//Effects
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BookEffects } from "../../state-store/effects/books";
import { booksReducer } from "../../state-store/reducers/books";

const ROUTES: Routes = [
    { path: '', component:  BooksComponent }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
        StoreModule.forFeature('books', booksReducer),
        EffectsModule.forFeature([BookEffects])
    ],
    declarations: [ 
        BooksComponent,
        BookListComponent,
        BookResumeComponent
    ]
})

export class BooksModule{}