
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './components/app'
import winners from './components/winners'
import profile from './components/profile'
import lot from './components/lot'
import feed from './components/feed'
import store from './store'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
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
      component: winners
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: profile
    },
  ],
});

const app = new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App)

});

