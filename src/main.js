import Vue from 'vue'
import App from './components/app'
import store from './store'
import GSignInButton from 'vue-google-signin-button'
import router from "./router";

Vue.use(GSignInButton)

const app = new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App)

});

