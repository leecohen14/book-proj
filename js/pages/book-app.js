import { bookService } from '../services/book-service.js';
import bookList from '../cmps/book-list.js';
import bookFilter from '../cmps/book-filter.js';
import bookDetails from '../pages/book-details.js';
// import bookEdit from '../pages/book-edit.js';

export default {
    template: `
        <section class="book-app">
            <h1>BOOK STORE</h1>
            <book-filter @filtered="setFilter" />    
            <book-list v-if="!selectedBook" :books="booksToShow" @selected="selectBook"/>
            <book-details v-if="selectedBook" :book="selectedBook" />
        </section>
    `,
    data() {
        return {
            books: [],
            selectedBook: null,
            filterBy: null,
        };
    },
    created() {
        this.loadBooks();
    },
    methods: {
        loadBooks() {
            bookService.query()
                .then(books => this.books = books);
        },
        selectBook(book) {
            // const book = bookService.getById(book.id);
            this.selectedBook = book;
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        close() {
            console.log('closing...');

            this.selectedBook = null;
        }

    },
    computed: {
        booksToShow() {
            console.log(this.filterBy);
            //   if (!this.filterBy) return this.books;
            if (!this.filterBy ||
                (this.filterBy.title === '' &&
                    this.filterBy.fromPrice === '' &&
                    this.filterBy.toPrice === '')
            )
                return this.books;

            if (this.filterBy.fromPrice === '') this.filterBy.fromPrice = 0;
            if (this.filterBy.toPrice === '') this.filterBy.toPrice = Infinity;

            const searchStr = this.filterBy.title.toLowerCase();
            const booksToShow = this.books.filter((book) => {
                return (
                    book.title.toLowerCase().includes(searchStr) &&
                    book.listPrice.amount >= this.filterBy.fromPrice &&
                    book.listPrice.amount < this.filterBy.toPrice
                );
            });
            return booksToShow;
        },
    },
    components: {
        bookList,
        bookFilter,
        bookDetails,
        // bookEdit,
    },

};