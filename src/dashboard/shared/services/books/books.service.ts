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
    books: Book[] = [
        {
            id: "59df4edd614abb0949016cf8",
            title: "The Lord of the Rings: The Fellowship of the Ring",
            description: "The Lord of the Rings: The Fellowship of the Ring is the first volume of J. R. R. Tolkien's The Lord of the Rings. It is followed by The Two Towers and The Return of the King. Set in Middle-earth, the story tells of the Dark Lord Sauron, who is seeking the One Ring. The Ring has found its way to the young hobbit Frodo Baggins. The fate of Middle-earth hangs in the balance as Frodo and eight companions who form the Fellowship of the Ring begin their journey to Mount Doom in the land of Mordor, the only place where the Ring can be destroyed.",
            coverUrl: "http://www.snugglyoranges.com/wp-content/uploads/2012/07/The-Fellowship-of-the-Ring.jpg"
        }
    ]
    constructor(private http: Http){
    
    }

    getBooks(): Observable<Book[]> {
        return this.http.get(API.BOOKS)
            .map((response: Response) => {
                debugger
                return response.json()
            });
    }
}