import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from './shared/shared.module';

const ROUTES: Routes = [
    { path: 'authors', loadChildren: './authors/authors.module#AuthorsModule' },
    { path: 'books', loadChildren: './books/books.module#BooksModule' },
    { path: 'bookings', loadChildren: './bookings/bookings.module#BookingsModule' }
]

@NgModule({
    imports: [
        RouterModule.forChild(ROUTES),
        SharedModule.forRoot()
    ]
})

export class DashboardModule{}