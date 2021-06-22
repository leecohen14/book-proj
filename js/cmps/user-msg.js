import { eventBus } from '../services/event-bus-service.js';

export default {
    template: `
        <div v-if="msg" class="user-msg" :class="msg.type">
        <button  @click="close">X</button>    
           <p>{{msg.txt}}</p>
           <router-link v-if="msg.action === 'add review'" :to="msg.link"  >watch <span @click="close">book</span></router-link>
        </div>
    `,
    data() {
        return {
            msg: null,
        };
    },
    created() {
        eventBus.$on('show-msg', this.showMsg);
    },
    destroyed() {
        eventBus.$off('show-msg', this.showMsg);
    },
    methods: {
        showMsg(msg) {
            this.msg = msg;
            setTimeout(() => {
                this.msg = null;
            }, 3000);
        },
        close() {
            this.msg = null;
        }
    }
};