import { bookService } from '../services/book-service.js'
import bookList from '../cmps/book-list.js'
export default {
    components: {
        // bookAddList,
        bookList,
    },
    props: [],
    template: `
           <section class="book-add  app-main">
            <label>Search:</label>
            <input v-model="search" type="text" ref="input" placeholder="Search...">
            <!-- <book-add-list v-if="books" :books="books" @addBook="addBook"/> -->
            <book-list v-if="books" :books="books" @addBook="addBook"/>
           </section>
    `,
    data() {
        return {
            search: null,
            books: null,
        }
    },
    methods: {
        searchBook() {
            bookService.getBooksToAdd(this.search)
                .then(booksToAdd => {
                    bookService.convertBooks(booksToAdd)
                        .then((convertedBooks) => this.books = convertedBooks)

                })
        },
        debounce(func, wait, ...args) {
            let timeout

            return function executedFunction() {
                const later = () => {
                    clearTimeout(timeout)
                    func(...args)
                }

                clearTimeout(timeout)
                timeout = setTimeout(later, wait)
            }
        },
        addBook(book) {
            console.log('adding book');
            return bookService.addGoogleBook(book);

        }
    },
    computed: {

    },
    mounted() {
        this.$refs.input.addEventListener('input', this.debounce(this.searchBook, 1000))
    },
    created() {
        //this.debounceSearch = this.debounce(this.searchBook, 1000)
    },
    destroyed(

    ) {

    }
}