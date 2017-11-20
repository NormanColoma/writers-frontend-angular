import { AbstractControl } from '@angular/forms';

export class BookValidators {
    static checkUrl (control: AbstractControl) {
        const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        const urlRegex = new RegExp(expression);

        return control.value.match(urlRegex) ? null : { invalidUrl: true };
    }
}