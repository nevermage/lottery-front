import { createRouter, createWebHistory } from "vue-router";
import { RouteRecordRaw } from "vue-router";
import feed from "../views/feed.vue";
import lot from "../views/lot.vue";
import winners from "../views/winners.vue";
import passwordReset from "../views/passwordReset.vue";
import profile from "../views/profile.vue";
import admin from '../views/admin.vue'
import {usersModule} from "../store/store";

const routes: Array<RouteRecordRaw> = [
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
        component: admin,
        beforeEnter: (to, from, next) => {
            if (usersModule.getUserInfo['role_id'] === 2) {
                next();
                return;
            }
            router.push({ name: 'feed' })
        },
        meta: { hideLayout: true }
    },
    {
        path: '/password-reset/:token',
        component: passwordReset,
        meta: { hideLayout: true }
    },
    {
        path: '/:catchAll(.*)',
        component: { template: '<h1>404</h1>' }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0, behavior: 'smooth' }
    },

});

export default router;