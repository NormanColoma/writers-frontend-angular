import { Inject, Injectable } from '@angular/core';
import { AuthorsService } from '../../../shared/services/authors/authors.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ExistsAuthorValidator {

    constructor(private authorsService: AuthorsService) {}

    chechIfAuthorExists (name: string, currentName: string): Observable<any> {
        if (name === currentName) {
            return Observable.of(null);
        }
        return this.authorsService
            .existsAuthor(name)
            .map((response: boolean) => response ? { existsAuthors: true } : null);
    }
}