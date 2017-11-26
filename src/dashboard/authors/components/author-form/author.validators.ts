import { Inject } from '@angular/core';
import { AbstractControl } from '@angular/forms';

export class AuthorValidators {
    static checkNumberOfBooks (control: AbstractControl) {
        return control.value >= 0 ? null : { invalidNumberOfBooks: true }
    }
}