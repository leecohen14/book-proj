import bookDetails from './pages/book-details.js';
import homePage from './pages/home-page.js';
import aboutPage from './pages/about-page.js';
import bookApp from './pages/book-app.js';
import bookAdd from './pages/book-add.js';


const routes = [{
        path: '/',
        component: homePage
    },
    {
        path: '/book',
        component: bookApp
    },
    {
        path: '/about',
        component: aboutPage
    },
    {
        path: '/book/:bookId?',
        component: bookDetails
    },
    {
        path: '/add',
        component: bookAdd
    },
    // {
    //     path: '/book/:bookId',
    //     component: bookDetails
    // },
];

export const router = new VueRouter({ routes });