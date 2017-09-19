import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';

//Containers
import { AuthorsComponent } from  './containers/authors/authors.component';
import { AuthorComponent } from  './containers/author/author.component';

//Components
import { AuthorResumeComponent } from "./components/author-resume/author-resume.component";
import { AuthorListComponent } from "./components/author-list/author-list.component";
import { AuthorFormComponent } from "./components/author-form/author-form.component";

//Store and effects
import { EffectsModule } from "@ngrx/effects";
import { AuthorEffects } from "../../state-store/effects/authors";
import { StoreModule } from "@ngrx/store";
import { authorsReducer } from "../../state-store/reducers/authors";

//Guards 
import { AuthorsGuard } from '../shared/guards/authors/authors.guard';

const ROUTES: Routes = [
    { path: '', component:  AuthorsComponent },
    { path: 'new', component: AuthorComponent },
    { path: ':id', component: AuthorComponent },
]

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
        StoreModule.forFeature('authors', authorsReducer),
        EffectsModule.forFeature([AuthorEffects])
    ],
    declarations: [ 
        AuthorsComponent,
        AuthorResumeComponent,
        AuthorListComponent,
        AuthorComponent,
        AuthorFormComponent
    ],
    providers: [
        AuthorsGuard
    ]
})

export class AuthorsModule{}