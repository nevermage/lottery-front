import { createRouter, createWebHistory } from "vue-router";
import { RouteRecordRaw } from "vue-router";
import {usersModule} from "../store/store";
import feed from "../views/feed.vue";
import lot from "../views/lot.vue";
import winners from "../views/winners.vue";
import passwordReset from "../views/passwordReset.vue";
import profile from "../views/profile.vue";
import admin from '../views/admin.vue'
import createLot from "../views/createLot.vue";

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
        beforeEnter: async (to, from, next) => {
            await usersModule.fetchUserInfo()
            if (usersModule.getUserInfo['role_id'] === 2) {
                next();
                return;
            }
            await router.push({ name: 'feed' })
        },
        meta: { hideLayout: true }
    },
    {
        path: '/password-reset/:token',
        component: passwordReset,
        meta: { hideLayout: true }
    },
    {
        path: '/create-lot',
        component: createLot,
        name: 'create-lot',
        beforeEnter: async (to, from, next) => {
            await usersModule.fetchUserInfo()
            if (usersModule.getUserInfo['role_id'] !== undefined) {
                next();
                return;
            }
            alert('Only authorized users can create lots')
            await router.push({ name: 'feed' })
        }
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