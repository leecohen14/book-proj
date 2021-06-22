export default {
    template: `
    <header class="app-header">
        <div class="logo">
            <img src="/img/logo.png" alt="no img">
        </div>
        <nav>
            <router-link to="/" active-class="active-link" exact>Home</router-link> |
            <router-link to="/book" >books</router-link> |
            <router-link to="/about" >About</router-link> 
        </nav>
    </header>
    `,
};