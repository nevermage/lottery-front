import {createApp} from 'vue'
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import { VueCookieNext } from "vue-cookie-next";
import GAuth from 'vue3-google-oauth2'
import googleAuthOptions from "./components/googleAuthOptions.vue";

const app = createApp(App)

const files = require.context('./', true, /\.vue$/i)
files.keys().map(key => {
    app.component(files(key).default.name ?? key.split('/').pop().split('.')[0], files(key).default);
})

app
    .use(GAuth, googleAuthOptions)
    .use(VueCookieNext)
    .use(router)
    .use(store)
    .mount('#app')