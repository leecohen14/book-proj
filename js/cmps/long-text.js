export default {
    props: ['desc'],
    template: `
     <section class="long-text">
          <p class="long-text-p">{{getDescToShow}} <button v-if="!showFullDesc" @click="toggleLongText">read More</button>

          </p>
          
    </section>
    `,
    data() {
        return {
            showFullDesc: false
        }
    },
    methods: {
        toggleLongText() {
            this.showFullDesc = !this.showFullDesc
        }
    },
    computed: {
        getDescToShow() {
            // const desc = this.book.description
            if (this.desc.length < 100) {
                this.showFullDesc = true;
                return this.desc;
            }
            return (this.showFullDesc) ? this.desc : this.desc.substring(0, 97) + '...';
        }
    },
    created() {

    },
    destroyed() {

    }
}