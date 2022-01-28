import {createApp} from 'vue'
import App from './App'
import router from "@/router/router";
import store from '@/store/store'
import GAuth from 'vue3-google-oauth2'
import googleAuthOptions from '@/components/googleAuthOptions'
import components from "@/components/components";

const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component)
})

app
    .use(GAuth, googleAuthOptions)
    .use(router)
    .use(store)
    .mount('#app')