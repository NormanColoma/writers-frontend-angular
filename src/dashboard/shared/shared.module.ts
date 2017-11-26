import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { AuthorsService } from './services/authors/authors.service';
import { BookService } from './services/books/books.service';

//Tokens
import { API_AUTHORS_TOKEN, API_BOOKS_TOKEN } from './tokens';
import { API } from '../../endpoints';

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
                BookService,
                {
                    provide: API_AUTHORS_TOKEN, useValue: API.WRITERS
                },
                {
                    provide: API_BOOKS_TOKEN, useValue: API.BOOKS,
                }
            ]
        }
    }
}