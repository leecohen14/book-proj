import { bookService } from "../services/book-service.js";
import { eventBus } from "../services/event-bus-service.js"
//import reviews from book by storage
export default {
    props: ['book'],
    template: `
    <section>
     <main >

       <ul v-if="book.reviews">
         <li class="review" v-for="(review,idx) in book.reviews">
           <div class="rev-left">
            <button @click="remove(idx)">X</button>
            <p>Rate: {{review.rate}}/5</p>  
            <p class="date"> Date: <br> {{review.readAt}}</p>  
           </div> 
           <div class="info">
             <p class="desc">"{{review.text}}"</p>  
           </div>
          </li>
        </ul>
        <div v-if="!book.reviews">no reviews yet</div>
        
        <form @submit.prevent="add">          
          <select v-model="bookReview.rate">
            <option disabled value="">RATE</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
          <br>
          <label>Read at:
             <input v-model="bookReview.readAt" type="date">
         </label>
            <!-- <label>Max Speed:</label>
            <input v-model.number="carToEdit.maxSpeed" type="number" > -->
            <br>
            <textarea v-model="bookReview.text" placeholder="add multiple lines"></textarea>
            <br>
            <button >Add</button>

       </form>

     </main>


    </section>

    `,
    data() {
        return {
            bookReview: {
                rate: '',
                readAt: '',
                text: null
            },
        }
    },
    methods: {
        add() {
            bookService.addReview(this.book, this.bookReview)
                .then(() => {
                    const msg = {
                        txt: `review added to ${this.book.title} successfully`,
                        type: 'success',
                        action: 'add review',
                        link: `/book/${this.book.id}`,
                    };
                    eventBus.$emit('show-msg', msg);
                    console.log('emitted bt eventbus')
                        // this.loadCars();
                })
                .catch(err => {
                    console.log(err);
                    const msg = {
                        txt: 'Error, please try again',
                        type: 'error'
                    };
                    eventBus.$emit('show-msg', msg);
                })
                // .then(() => this.$router.push('/book/' + this.book.id))
                .then(() => this.$router.push('/'))
        },
        remove(idx) {
            bookService.removeReview(this.book, idx)
                .then(() => {
                    const msg = {
                        txt: 'review removed successfully',
                        type: 'success',
                        link: '/book/' + this.book.Id,
                    };
                    eventBus.$emit('show-msg', msg);
                    console.log('emitted bt eventbus')
                        // this.loadCars();
                })
                .catch(err => {
                    console.log(err);
                    const msg = {
                        txt: 'Error, please try again',
                        type: 'error'
                    };
                    eventBus.$emit('show-msg', msg);
                });
        }
    },
    computed: {

    },
    created() {

    },
    destroyed() {

    }
}