import { utilService } from '../services/util-service.js';

export default {
    props: ['book'],
    template: `
  <div class="book-preview">
      <h2>{{book.title}}</h2>
      <router-link :to="'/book/'+book.id">
         <img :src="book.thumbnail" alt="no img">
      </router-link>
      <h3>price: {{book.listPrice.amount}}<span>{{setCurrencyIcon}}</span></h3>
  </div>
    `,
    data() {
        return {

        }
    },
    methods: {

    },
    computed: {
        setCurrencyIcon() {
            // console.log('book');
            return utilService.convertCurrencyToSymbol(this.book.listPrice.currencyCode)
        }
    },
    created() {

    },
    destroyed() {

    }
}





// export default {
//     props: ['book'],
//     template: `
//   <div class="book-preview">
//       <p>title: {{book.title}}</p>
//       <p>price: {{book.listPrice.amount}}<span>{{setCurrencyIcon(book)}}</span></p>
//   </div>
//   `,
//     data() {
//         return {

//         }
//     },
//     computed: {
//         setCurrencyIcon(book) {
//             console.log('book');

//             return utilService.convertCurrencyToSymbol(book.listPrice.currencyCode)
//         }
//     }
// };