import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { Author } from '../../models/author';
import { API } from '../../../../endpoints';

const AUTHORS : Author [] = [
    { 
        id: '1' , 
        name: 'R.R. Martin', 
        about: 'This is the most crazy writer I have ever seen in my life', 
        books: 5, 
        created_at: new Date(2017, 7, 29)
    }
];

@Injectable()
export class AuthorsService {

    constructor(private http: Http) {

    }

    getAuthors():Observable<Author []> {
        return this.http.get(API.WRITERS)
            .map((response: any) => { 
                debugger;
                return response.json()
            });
    }

    getAuthor(id: string) : Observable<Author | any> {
        if (!id) { 
            return Observable.of({});
        }

        const author = AUTHORS.find(author => author.id === id);
        return Observable.of(author).delay(500);
    }

    updateAuthor(id: string, author: Author): Observable<Author> {
        let authorToBeUpdated = AUTHORS.find(author => author.id === id);
        authorToBeUpdated = Object.assign({}, authorToBeUpdated, author);

        return Observable.of(authorToBeUpdated);
    }

    addAuthor(author: Author): Observable<Author> {
        const id = String(AUTHORS.length + 1);

        author.id = id;
        author.created_at = new Date();
        AUTHORS.push(author);

        return Observable.of(author);
    }

    removeAuthor(id: string) : Observable<String> {
        
        AUTHORS.splice(Number(id) -1);

        return Observable.of(id);
    }
}