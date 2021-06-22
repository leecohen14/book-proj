import { utilService } from './util-service.js';
// import { storageService } from './async-storage-service.js';
const BOOKS_ADD_KEY = 'books-add';

export const googleSearchService = {
    searchBooks
};


function searchBooks(words) {
    const URL =
        `https://www.googleapis.com/books/v1/volumes?printType=books&q=${words}`;
    return axios.get(URL)
        .then(res => res.data.items)
        .catch(err => {
            console.log('Had Issues: ', err)
        })
        .then(res => {
            utilService.saveToStorage(BOOKS_ADD_KEY, res);
            return res;
        })
}