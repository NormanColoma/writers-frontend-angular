import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';

// feature modules
import { DashboardModule } from '../dashboard/dashboard.module';
// containers
import { AppComponent } from './containers/app/app.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { authorsReducer } from "../state-store/reducers/authors";
import { EffectsModule } from "@ngrx/effects";
import { AuthorEffects } from "../state-store/effects/authors";


// components

// routes
export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'authors' }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    DashboardModule,
    StoreModule.forRoot([]),
    EffectsModule.forRoot([])
  ],
  declarations: [
    AppComponent,
    AppHeaderComponent

  ],
  providers: [
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}