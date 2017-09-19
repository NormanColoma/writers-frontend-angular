import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { AuthorsService } from './services/authors/authors.service';

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
                AuthorsService
            ]
        }
    }
}