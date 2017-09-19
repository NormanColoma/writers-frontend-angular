import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BooksComponent } from  './containers/books/books.component';

const ROUTES: Routes = [
    { path: '', component:  BooksComponent }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES)
    ],
    declarations: [ 
        BooksComponent
    ]
})

export class BooksModule{}