import { Component, Input, Output, OnChanges, SimpleChanges, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl} from '@angular/forms';

//Models and Validators
import { Author } from '../../../shared/models/author';
import { AuthorValidators } from './author.validators';
import { ExistsAuthorValidator } from './exists-author.validator';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'author-form',
    providers: [
        ExistsAuthorValidator
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <form [formGroup]="form" class="mt-4">
        <div 
            class="form-group"
            [class.has-danger]="required('name') || nameAlreadyTaken">
            <label for="name" class="form-control-label">Name</label>
            <input 
                type="text" 
                class="form-control" 
                id="name" 
                formControlName="name" 
                placeholder="Enter the author's name...">
            <div 
                class="form-control-feedback" 
                *ngIf="required('name')">You must enter a name
            </div>
            <div 
                class="form-control-feedback" 
                *ngIf="nameAlreadyTaken">Author already exists
            </div>
        </div>
        <div class="form-group" [class.has-danger]="required('about')">
            <label class="form-control-label" for="about">About</label>
            <textarea 
                rows="4"
                class="form-control" 
                id="about" 
                formControlName="about" 
                placeholder="Short description about the author...">
            </textarea>
            <div 
                class="form-control-feedback" 
                *ngIf="required('about')">You must supply a brief description about the author
            </div>
        </div>
        <div class="form-group" [class.has-danger]="required('books') || invalid">
            <label for="books" class="form-control-label">Number of books</label>
            <input 
                type="number"
                [min]="0"
                class="form-control" 
                id="books" 
                formControlName="books" 
                placeholder="Number of books written by the author..">
            <div 
                class="form-control-feedback" 
                *ngIf="required('books')">
                You must enter a number of books
            </div>
            <div 
                class="form-control-feedback" 
                *ngIf="invalid">
                Number of books have to be greater or equals than 0
            </div>
        </div>
        <button 
            type="button" 
            class="btn btn-small btn-primary btn-bordered"
            [disabled]="form.invalid"
            *ngIf="exists"
            (click)="updateAuthor()">Update</button>
        <button 
            type="button" 
            class="btn btn-small btn-primary btn-bordered"
            *ngIf="!exists"
            [disabled]="form.invalid"
            (click)="addAuthor()">Create</button>
    </form>
    `
})

export class AuthorFormComponent implements OnChanges {

    exists = false; 

    @Input()
    author: Author;

    @Output()
    update = new EventEmitter<Author>();

    @Output()
    add = new EventEmitter<Author>();
    
    
    form = this.fb.group({
        name: ['', Validators.required, this.existsAuthors.bind(this)],
        about: ['', Validators.required],
        books: [0, [Validators.required, AuthorValidators.checkNumberOfBooks]]
    })

    constructor(private fb: FormBuilder, private existsAuthorValidator:ExistsAuthorValidator) {}

    get invalid() {
        return this.form.get('books').hasError('invalidNumberOfBooks') && 
        this.form.get('books').touched;
    }

    get nameAlreadyTaken() {
        return this.form.get('name').hasError('existsAuthors') && 
        this.form.get('name').touched;
    }

    existsAuthors(control: AbstractControl) {
        const currentAuthorName = this.author ? this.author.name : null;
        return this.existsAuthorValidator
            .chechIfAuthorExists(control.value, currentAuthorName)
            .map((response: any) => response);
    }

    required(name: string) {
        return (
          this.form.get(name).hasError('required') &&
          this.form.get(name).touched
        );
      }

    ngOnChanges(changes: SimpleChanges) {
        if(this.author && this.author.name) {
            this.exists = true;
            const value = this.author;
            this.form.patchValue(value);
        }
    }

    updateAuthor() {
        this.update.emit(this.form.value);
    }

    addAuthor() {
        this.add.emit(this.form.value);
    }
}