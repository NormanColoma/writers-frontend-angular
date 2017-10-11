import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    styleUrls: ['app-header.component.scss'],
    template: `
        <nav class="navbar navbar-toggleable-md navbar-inverse bg-info">
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <a 
                    *ngFor="let item of nav"
                    class="nav-item nav-link" 
                    [routerLink]="[item.link]" 
                    routerLinkActive="active">
                        {{ item.name }}
                </a>
            </div>
            </div>
        </nav>
    `
})

export class AppHeaderComponent {
    nav: any [] = [
        {
            link: '../authors',
            name: 'Authors'
        },
        {
            link: '../books',
            name: 'Books'
        }
    ]
}