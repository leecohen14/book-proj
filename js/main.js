import { router } from './router.js';
import appHeader from './cmps/app-header.js'
import appFooter from './cmps/app-footer.js'
import userMsg from './cmps/user-msg.js'

const options = {
    el: '#app',
    router,
    template: `
         <section>
             <app-header/>
             <user-msg/>
             <router-view />
             <app-footer/>
         </section>

    `,
    components: {
        appHeader,
        appFooter,
        userMsg
    }
};

new Vue(options)