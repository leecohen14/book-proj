import { utilService } from '../services/util-service.js';
import { bookService } from '../services/book-service.js';
import longText from '../cmps/long-text.js';
import reviewAdd from '../cmps/review-add.js';

export default {
    components: {
        longText,
        reviewAdd
    },
    template: `
         <section v-if="book" class="book-details">
            <button class="close-book" @click="$router.push('/book')">X</button>
            <div class="details">
                
                <img class="book-img" :src="book.thumbnail" alt="no img">
                <div class="book-info">

                    <h2>{{book.title}}</h2>
                    <h4>{{book.subtitle}}</h4>
                    <!-- <p>authors: {{book.authors}}</p> -->
                    <p>{{getAuthors}}</p>
                    <p>Published at: {{book.publishedDate}}</p>
                    <long-text :desc="book.description"/>
                    <p>Pages: {{book.pageCount}}</p>
                    <!-- <p>categories: {{book.categories}}</p> -->
                    <p>{{getCategories}}</p>
                    <p>Language: {{book.language}}</p>
                    <h3 :class="setColor">price: {{book.listPrice.amount}} <span :class="setColor">{{setCurrencyIcon}}</span></h3>
                    <img class="sale" v-if="book.listPrice.isOnSale" src="../../img/sale.png" alt="no img">
                    <p>{{setIsNewBook}}</p>
                    <p>{{setReadingLevel}}</p>

                </div>

            </div>
            <hr>
            <review-add :book="book"/>
            <hr>
            <div>
                <!-- <router-link :to="'/book/' + nextC">Prev</router-link>
                <router-link>Next</router-link> -->
            </div>
         </section>
    `,
    data() {
        return {
            book: null,
        }
    },
    computed: {
        setCurrencyIcon() {
            // console.log('book');
            return utilService.convertCurrencyToSymbol(this.book.listPrice.currencyCode)
        },
        setReadingLevel() {
            if (this.book.pageCount > 500) return 'Long Reading'
            if (this.book.pageCount > 200) return 'decent Reading'
            else if (this.book.pageCount < 100) return 'Light Reading'
        },
        setIsNewBook() {
            const currYear = new Date().getFullYear();
            var diff = currYear - this.book.publishedDate;
            if (diff > 10) return 'Veteran Book'
            else if (diff < 1) return 'New!'
        },
        setColor() {
            if (this.book.listPrice.amount > 150) return 'red'
            if (this.book.listPrice.amount < 150) return 'green'
        },
        getAuthors() {
            const authors = this.book.authors
            if (authors.length === 1) return `Author: ${authors[0]}`;
            let authorsNames = authors.map(author => {
                return author
            }).join(', ');
            return `Authors: ${authorsNames}`;
        },
        getCategories() {
            const categories = this.book.categories
            if (categories.length === 1) return `Category: ${categories[0]}`;
            let categoriesNames = categories.map(categories => {
                return categories
            }).join(', ');
            return `Categories: ${categoriesNames}`;
        },

    },
    created() {
        // get id from route and use
        const { bookId } = this.$route.params;
        bookService.getById(bookId)
            .then(book => this.book = book);
    },
    // watch: {
    //     '$route.params.bookId': {
    //         immediate: true,
    //         handler() {
    //             const { bookId } = this.$route.params;
    //             bookService.getById(bookId)
    //                 .then(book => this.book = book);
    //             bookService.getNextCarId(bookId)
    //                 .then(bookId => this.nextBookId = bookId);
    //         },
    //     }
    // },
}