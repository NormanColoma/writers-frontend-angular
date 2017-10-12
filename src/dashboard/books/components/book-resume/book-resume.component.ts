import { Component } from '@angular/core';


@Component({
    selector: 'book-resume',
    template: `
        <div class="card card-container mb-3 d-flex flex-row">
            <div class="w-25">
                <img class="card-img-left h-100 w-100" src="http://www.snugglyoranges.com/wp-content/uploads/2012/07/The-Fellowship-of-the-Ring.jpg" alt="Card image cap">
            </div>
            <div class="card-block w-75">
                <h4 class="card-title">The Lord of The Rings</h4>
                <p class="card-text">The Lord of the Rings: The Fellowship of the Ring is a 2001 New Zealand-American epic high fantasy adventure film directed by Peter Jackson based on the first volume of J. R. R. Tolkien's The Lord of the Rings (1954–1955).[4][5][6] It is the first installment in The Lord of the Rings series, and was followed by The Two Towers (2002) and The Return of the King (2003), based on the second and third volumes of The Lord of the Rings.
                
                Set in Middle-earth, the story tells of the Dark Lord Sauron (Sala Baker), who is seeking the One Ring.</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                <a href="#" class="btn btn-primary float-right">View more</a>
            </div>
        </div>
    `,
    styleUrls: ['./book-resume.component.scss']
})

export class BookResumeComponent { }