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
        return this.http.get(`${API.BOOKS}/author/${authorId}`)
            .map((response: Response) => response.json());
    }

    addBook(book: Book) : Observable<Book> {
        return this.http.post(`${API.BOOKS}/new`, book)
            .map((response: Response) => response.json());
    }

    findBook(id: string): Observable<Book> {
        return this.http.get(`${API.BOOKS}/${id}`)
            .map((response: Response) => response.json());
    }
}