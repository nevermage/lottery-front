import {createRouter, createWebHistory} from "vue-router";
import feed from "@/views/feed";
import lot from "@/views/lot";
import winners from "@/views/winners";
import profile from "@/views/profile";
import store from "@/store/store";
import admin from '@/views/admin'
import passwordReset from "@/views/passwordReset";

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
    component: admin,
    beforeEnter: (to, from, next) => {
      if (store.getters.getUserInfo.role_id === 2) {
        next();
        return;
      }
      router.push({ name: 'feed' })
    }
  },
  {
    path: '/password-reset/:token',
    component: passwordReset,
    meta: { hideLayout: false }
  },
  {
    path: '/:catchAll(.*)',
    component: { template: '<h1>404</h1>' }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
});

export default router;