import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from "@angular/forms";

//Containers
import { BooksComponent } from  './containers/books/books.component';
import { BookComponent } from  './containers/book/book.component';

//Components
import { BookListComponent } from './components/book-list/book-list.component';
import { BookResumeComponent } from './components/book-resume/book-resume.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';

//Effects
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BookEffects } from "../../state-store/effects/books";
import { AuthorEffects } from "../../state-store/effects/authors";
import { booksReducer } from "../../state-store/reducers/books";
import { reducers } from "../../state-store/reducers";

const ROUTES: Routes = [
    { path: '', component:  BooksComponent },
    { path: 'new', component:  BookComponent },
    { path: ':id', component:  BookComponent },
    { path: ':id/details', component: BookDetailComponent }
]

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
        StoreModule.forFeature('authors', reducers),
        EffectsModule.forFeature([BookEffects, AuthorEffects])
    ],
    declarations: [ 
        BooksComponent,
        BookListComponent,
        BookResumeComponent,
        BookComponent,
        BookFormComponent,
        BookDetailComponent
    ]
})

export class BooksModule{}