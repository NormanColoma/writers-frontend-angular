import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Author } from '../../../shared/models/author';
import { Book } from '../../../shared/models/book';

import { BookValidators } from './book-validators';

@Component({
    selector: 'book-form',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<div>
        <form [formGroup]="form" class="mt-4">
            <div class="row">
                <div 
                    class="form-group col"
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
                    class="form-group col"
                    [class.has-danger]="required('author_id')">
                    <label for="author_id" class="form-control-label">Author</label>
                    <select 
                        type="text" 
                        class="form-control" 
                        id="author_id" 
                        formControlName="author_id">
                        <option value="">Who author did write this book?</option>
                        <option *ngFor="let author of authors" [value]="author.id">{{ author.name }}</option>
                    </select>
                    <div 
                        class="form-control-feedback" 
                        *ngIf="required('author_id')">You must enter an author
                    </div>
                </div>
            </div>
            <div 
                class="form-group"
                [class.has-danger]="required('description')">
                <label for="description" class="form-control-label">Resume</label>
                <textarea 
                    type="text" 
                    class="form-control" 
                    id="description" 
                    formControlName="description" 
                    placeholder="Enter a brief resume about the book"
                    rows="8">
                </textarea>
                <div 
                    class="form-control-feedback" 
                    *ngIf="required('description')">You must enter a resume
                </div>
            </div>
            <div 
                class="form-group"
                [class.has-danger]="required('coverUrl') || invalidUrl">
                <label for="coverUrl" class="form-control-label">Book's cover image</label>
                <input 
                    type="text" 
                    class="form-control" 
                    id="coverUrl" 
                    formControlName="coverUrl" 
                    placeholder="Enter book's cover link...">
                <div 
                    class="form-control-feedback" 
                    *ngIf="required('coverUrl')">You must enter a cover link url
                </div>
                <div 
                    class="form-control-feedback" 
                    *ngIf="invalidUrl">You must enter a valid link url
                </div>
            </div>
            <button 
                type="button" 
                class="btn btn-primary btn-bordered"
                [disabled]="form.invalid"
                *ngIf="!book"
                (click)="addBook()">
                Add book
            </button>
            <button 
                type="button" 
                class="btn btn-primary btn-bordered"
                [disabled]="form.invalid"
                *ngIf="book"
                (click)="editBook()">
                Save changes
            </button>
        </form>
    </div>`
})

export class BookFormComponent implements OnChanges {
    
    @Input()
    authors: Author[];

    @Input()
    book: Book;

    @Output()
    add = new EventEmitter<Book>();
    
    @Output()
    edit = new EventEmitter<Book>();

    form = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        author_id: ['', Validators.required],
        coverUrl: ['', [Validators.required, BookValidators.checkUrl]]
    });

    constructor(private fb: FormBuilder){}

    ngOnChanges(changes: SimpleChanges) {
        if(this.book) {
            const value = Object.assign({}, this.book);

            if (this.authors.findIndex(author => author.id === this.book.author_id) === -1) {
                value.author_id = "";
            }
            this.form.patchValue(value);
        }
    }

    required(name: string) {
        return (
            this.form.get(name).hasError('required') &&
            this.form.get(name).touched
        );
    }
    
    addBook() {
        this.add.emit(this.form.value);
    }

    editBook() {
        this.edit.emit(this.form.value);
    }

    get invalidUrl() {
        return this.form.get('coverUrl').hasError('invalidUrl') && 
            !this.form.get('coverUrl').hasError('required') &&
            this.form.get('coverUrl').touched;
    }
}