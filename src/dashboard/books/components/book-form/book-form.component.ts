import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Author } from '../../../shared/models/author';

@Component({
    selector: 'book-form',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<div>
        <form [formGroup]="form" class="mt-4">
            <div 
            class="form-group"
            [class.has-danger]="required('title')">
                <label for="title" class="form-control-label">Title</label>
                <input 
                    type="text" 
                    class="form-control" 
                    id="title" 
                    formControlName="title" 
                    placeholder="Enter book's title...">
                <div 
                    class="form-control-feedback" 
                    *ngIf="required('title')">You must enter a title
                </div>
            </div>
            <div 
            class="form-group"
            [class.has-danger]="required('authorId')">
                <label for="authorId" class="form-control-label">Title</label>
                <select 
                    type="text" 
                    class="form-control" 
                    id="authorId" 
                    formControlName="authorId">
                    <option value="">Who author did write this book?</option>
                    <option *ngFor="let author of authors" [value]="author.id">{{ author.name }}</option>
                </select>
                <div 
                    class="form-control-feedback" 
                    *ngIf="required('title')">You must enter a title
                </div>
            </div>
        </form>
    </div>`
})

export class BookFormComponent {
    
    @Input()
    authors: Author[];

    form = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        authorId: ['', Validators.required],
        coverUrl: ['', Validators.required]
    });

    constructor(private fb: FormBuilder){}

    required(name: string) {
        return (
          this.form.get(name).hasError('required') &&
          this.form.get(name).touched
        );
      }
}