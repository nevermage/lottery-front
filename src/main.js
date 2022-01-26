import {createApp} from 'vue'
import App from './App'
import router from "@/router/router";
import store from '@/store/store'
import GAuth from 'vue3-google-oauth2'
import gAuthOptions from '@/components/gAuthOptions'

createApp(App)
    .use(GAuth, gAuthOptions)
    .use(router)
    .use(store)
    .mount('#app')