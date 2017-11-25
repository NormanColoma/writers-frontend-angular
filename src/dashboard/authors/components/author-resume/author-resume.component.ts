import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Author } from '../../../shared/models/author';

@Component({
    selector: 'author-resume',
    template: `
        <div>
            <div class="card mb-4">
                <div class="card-block">
                    <h4 
                        class="card-title">
                        {{ author.name }} 
                        <span
                            *ngIf="isNew" 
                            class="badge badge-pill badge-info">
                            New
                        </span>
                    </h4>
                    <p class="card-text">{{ author.about }}</p>
                    <a href="#" class="btn btn-sm btn-primary btn-bordered" [routerLink]="viewBooksLink">View Books</a>
                    <a href="#" class="btn btn-sm btn-primary btn-bordered" [routerLink]="updateLink">Update</a>
                    <button 
                        type="button" 
                        class="btn btn-sm btn-primary btn-bordered"
                        (click)="removeAuthor()">
                        Remove
                    </button>
                </div>
            </div>
        </div>
    `
})

export class AuthorResumeComponent{

    constructor() {

    }

    @Input() 
    author: Author;

    @Output()
    remove = new EventEmitter<String>();

    get viewBooksLink() {
        return [`../authors/${this.author.id}/books`];
    }

    get updateLink() {
        return [`../authors/${this.author.id}`];
    }

    get isNew() {
        const currentDate = new Date();
        const createdAuthorDate = new Date(this.author.created_at);
        
        return (
            currentDate.getFullYear() == createdAuthorDate.getFullYear() &&
            currentDate.getMonth() == createdAuthorDate.getMonth() &&
            currentDate.getDate() == createdAuthorDate.getDate() 
        );
    }

    removeAuthor(){
        this.remove.emit(this.author.id);
    }
}