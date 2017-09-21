import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

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
            .map((response: Response) => response.json());
    }

    getAuthor(id: string) : Observable<Author | any> {
        if (!id) { 
            return Observable.of({});
        }

        return this.http.get(`${API.WRITERS}/${id}`)
            .map((response: Response) => response.json());
    }

    updateAuthor(id: string, author: Author): Observable<Author> {
        return this.http.put(`${API.WRITERS}/${id}`, author)
            .map((response: Response) => response.json());
    }

    addAuthor(author: Author): Observable<Author> {
        return this.http.post(API.WRITERS, author)
            .map((response: Response) => response.json());
    }

    removeAuthor(id: string) : Observable<String> {
        return this.http.delete(`${API.WRITERS}/${id}`)
        .map(() => id);
    }
}