import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BookingsComponent } from  './containers/bookings/bookings.component';

const ROUTES: Routes = [
    { path: '', component:  BookingsComponent }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES)
    ],
    declarations: [ 
        BookingsComponent
    ]
})

export class BookingsModule{}