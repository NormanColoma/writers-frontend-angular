import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

//Models
import { Book } from '../../models/book';

//Rxjs
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of'; 
import 'rxjs/add/operator/map'; 

import { API } from '../../../../endpoints';

@Injectable()
export class BookService {

    constructor(private http: Http){}

    getBooks(): Observable<Book[]> {
        return this.http.get(API.BOOKS)
            .map((response: Response) => response.json());
    }

    getByAuthor(authorId: string): Observable<Book[]> {
        /*const books : Book [] = [
            {
                id: '123',
                title: 'tiotle',
                description: 'desc',
                coverUrl: 'cover',
                author_id: 'sdf'
            }
        ];
        return Observable.of(books);*/
        return this.http.get(`${API.BOOKS}/author/${authorId}`)
            .map((response: Response) => response.json());
    }
}