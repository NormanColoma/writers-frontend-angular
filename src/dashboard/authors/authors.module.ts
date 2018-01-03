import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';
import { Http } from '@angular/http';

//Containers
import { AuthorsComponent } from  './containers/authors/authors.component';
import { AuthorComponent } from  './containers/author/author.component';
import { AuthorBooksComponent } from  './containers/author-books/author-books.component';

//Components
import { AuthorResumeComponent } from "./components/author-resume/author-resume.component";
import { AuthorListComponent } from "./components/author-list/author-list.component";
import { AuthorFormComponent } from "./components/author-form/author-form.component";
import { AuthorBookListComponent } from "./components/author-book-list/author-book-list.component";

//Store and effects
import { EffectsModule } from "@ngrx/effects";
import { AuthorEffects } from "../../state-store/effects/authors";
import { BookEffects } from "../../state-store/effects/books";
import { StoreModule } from "@ngrx/store";
import { authorsReducer } from "../../state-store/reducers/authors";
import { reducers } from "../../state-store/reducers";

//Guards 
import { AuthorsGuard } from '../shared/guards/authors/authors.guard';
import { AuthorBooksGuard } from '../shared/guards/authors/author.guard';

const ROUTES: Routes = [
    { path: '', component:  AuthorsComponent},
    { path: 'new', component: AuthorComponent },
    { path: ':id', component: AuthorComponent },
    { path: ':id/books', component: AuthorBooksComponent, canActivate: [AuthorBooksGuard] }
]

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
        StoreModule.forFeature('collection', reducers),
        EffectsModule.forFeature([AuthorEffects, BookEffects])
    ],
    declarations: [ 
        AuthorsComponent,
        AuthorResumeComponent,
        AuthorListComponent,
        AuthorComponent,
        AuthorFormComponent,
        AuthorBooksComponent,
        AuthorBookListComponent
    ],
    providers: [
        AuthorsGuard,
        AuthorBooksGuard
    ]
})

export class AuthorsModule{}