import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { Author } from '../../models/author';
import { API_AUTHORS_TOKEN } from '../../tokens';

@Injectable()
export class AuthorsService {

    constructor(private http: Http, @Inject(API_AUTHORS_TOKEN) private api: string) {}

    getAuthors():Observable<Author []> {
        return this.http.get(this.api)
            .map((response: Response) => response.json());
    }

    getAuthor(id: string) : Observable<Author | any> {
        if (!id) { 
            return Observable.of({});
        }

        return this.http.get(`${this.api}/${id}`)
            .map((response: Response) => response.json());
    }

    updateAuthor(id: string, author: Author): Observable<Author> {
        return this.http.put(`${this.api}/${id}`, author)
            .map((response: Response) => response.json());
    }

    addAuthor(author: Author): Observable<Author> {
        return this.http.post(this.api, author)
            .map((response: Response) => response.json());
    }

    removeAuthor(id: string) : Observable<String> {
        return this.http.delete(`${this.api}/${id}`)
        .map(() => id);
    }

    existsAuthor(name: string) : Observable<boolean> {
        return this.http.get(`${this.api}/existing?name=${name}`)
        .map((response: Response) => response.json())
        .map((response: any) => response.exists);
    }
}