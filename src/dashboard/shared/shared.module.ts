import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { AuthorsService } from './services/authors/authors.service';
import { BookService } from './services/books/books.service';

@NgModule({
    imports: [
        CommonModule,
        HttpModule
    ],
    declarations: []
})

export class SharedModule {
    static forRoot() : ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                AuthorsService,
                BookService
            ]
        }
    }
}