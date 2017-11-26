import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';

//Models
import { Book } from '../../models/book';

//Rxjs
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of'; 
import 'rxjs/add/operator/map'; 

import { API } from '../../../../endpoints';
import { API_BOOKS_TOKEN } from '../../tokens';

@Injectable()
export class BookService {

    constructor(private http: Http, @Inject(API_BOOKS_TOKEN) private api: string){}

    getBooks(): Observable<Book[]> {
        return this.http.get(this.api)
            .map((response: Response) => response.json());
    }

    getByAuthor(authorId: string): Observable<Book[]> {
        return this.http.get(`${this.api}/author/${authorId}`)
            .map((response: Response) => response.json());
    }

    addBook(book: Book) : Observable<Book> {
        return this.http.post(`${this.api}/new`, book)
            .map((response: Response) => response.json());
    }

    findBook(id: string): Observable<Book> {
        return this.http.get(`${this.api}/${id}`)
            .map((response: Response) => response.json());
    }

    editBook(id: string, book: Book) : Observable<Book> {
        return this.http.put(`${this.api}/${id}`, book)
            .map((response: Response) => response.json());
    }
}