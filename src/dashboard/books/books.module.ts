import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from "@angular/forms";

//Containers
import { BooksComponent } from  './containers/books/books.component';
import { BookComponent } from  './containers/book/book.component';
import { BookDetailComponent } from './containers/book-detail/book-detail.component';

//Components
import { BookListComponent } from './components/book-list/book-list.component';
import { BookResumeComponent } from './components/book-resume/book-resume.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { BookDetailViewComponent } from './components/book-detail-view/book-detail-view.component';

//Effects
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BookEffects } from "../../state-store/effects/books";
import { AuthorEffects } from "../../state-store/effects/authors";
import { booksReducer } from "../../state-store/reducers/books";
import { reducers } from "../../state-store/reducers";

//Guards 
import { BookGuard } from '../shared/guards/books/book.guard';

const ROUTES: Routes = [
    { path: '', component:  BooksComponent },
    { path: 'new', component:  BookComponent },
    { path: ':id', component:  BookComponent },
    { path: ':id/details', component: BookDetailComponent, canActivate: [BookGuard] }
]

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
        StoreModule.forFeature('collection', reducers),
        EffectsModule.forFeature([BookEffects, AuthorEffects])
    ],
    declarations: [ 
        BooksComponent,
        BookListComponent,
        BookResumeComponent,
        BookComponent,
        BookFormComponent,
        BookDetailComponent,
        BookDetailViewComponent
    ],
    providers: [
        BookGuard
    ]
})

export class BooksModule{}