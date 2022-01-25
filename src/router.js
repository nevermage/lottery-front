import Vue from 'vue';
import VueRouter from "vue-router";
import feed from "./components/feed";
import lot from "./components/lot";
import winners from "./components/winners";
import profile from "./components/profile";
import store from "./store";
Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        name: 'feed',
        component: feed
    },
    {
        path: '/lot/:id',
        name: 'lot',
        component: lot
    },
    {
        path: '/winners',
        name: 'winners',
        component: winners,
    },
    {
        path: '/profile/:id',
        name: 'profile',
        component: profile
    },
    {
        path: '/admin',
        name: 'admin',
        component: { template: '<h1>admin page</h1>' },
        beforeEnter: (to, from, next) => {
            if (store.getters.getUserInfo.role_id == 2) {
                next()
            }
            router.push({ name: 'feed' })
        }
    },
    {
        path: '*',
        component: { template: '<h1>404</h1>' }
    }
]

const router = new VueRouter({
    mode: 'history',
    routes: routes,
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
});

export default router;