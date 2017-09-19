import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    styleUrls: ['app-header.component.scss'],
    template: `
        <nav class="navbar navbar-toggleable-md navbar-inverse bg-info">
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <a class="nav-item nav-link active" [routerLink]="['../authors']">Authors <span class="sr-only">(current)</span></a>
                <a class="nav-item nav-link" href="#">Books</a>
                <a class="nav-item nav-link" href="#">Best-seller</a>
            </div>
            </div>
        </nav>
    `
})

export class AppHeaderComponent {}