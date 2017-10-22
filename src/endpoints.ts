const AUTHORS_HOST = `http://${process.env.AUTHORS_HOST}`;
const BOOKS_HOST = `http://${process.env.BOOKS_HOST}`;

export const API = {
    WRITERS: `${AUTHORS_HOST}/writers`,
    BOOKS: `${BOOKS_HOST}/books`
}