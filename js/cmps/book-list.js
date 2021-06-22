import { bookService } from '../services/book-service.js';
import bookPreview from './book-preview.js';

export default {
    props: ['books'],
    template: `
  <ul class="book-list">
    <li v-for="book in books" :key="book.id" class="book-preview-container">
      <book-preview :book="book"  @click.native="select(book)"/>
    </li>
  </ul>

  `,
    methods: {
        select(book) {
            //if this id is in the books so commit the selected, 
            //else , emit "add book"!
            bookService.query()
                .then((books) => {
                    const isThere = books.find((b) => {
                        return b.id === book.id
                    })
                    return isThere
                })
                .then(res => {
                    if (!res) this.$emit('addBook', book)
                    else this.$emit('selected', book);
                })

        },
    },
    components: {
        bookPreview
    }
}