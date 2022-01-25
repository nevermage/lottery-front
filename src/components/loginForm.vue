<template>
  <div>
    <div class="loginFormHead">
      <div class="loginFormHeadGrid">
        <strong class="loginFormLabel">Log In</strong>
        <a class="loginFormHeadSwitcher" @click="switchForms">Sign Up</a>
      </div>
    </div>
    <div class="loginForm">
      <p class="loginFormInputTitle">username:</p>
      <input class="loginFormInput" v-model="email" type="text" placeholder="username">
      <p class="loginFormInputTitle">password:</p>
      <input class="loginFormInput" v-model="password" type="password" placeholder="***************">
      <google-sing-up @close="close"/>
      <button class="loginFormButton" @click="login()">Log In</button>
    </div>
  </div>
</template>

<script>
import VueCookies from 'vue-cookies';
import axios from 'axios'
import GoogleSingUp from "./googleSingUp";

export default {
  components: {GoogleSingUp},
  data: function() {
    return  {
      password: '',
      email: '',
    }
  },
  methods: {
    switchForms() {
      this.$emit('switch');
    },
    close() {
      this.$emit('close');
    },
    clearLoginData() {
      this.password = [];
      this.email = [];
    },
    login() {
      axios
        .post("http://localhost/api/login", {
          email: this.email,
          password: this.password,
        })
        .then((data) => {
          VueCookies.set('token', data.data);
          this.$store.dispatch('fetchUserInfo');
          this.close();
          this.clearLoginData();
        })
        .catch((error) => {
          alert(
              error.response.data.message
                  ? Object.values(error.response.data.errors)[0][0]
                  : error.response.data.data
          );
        });
    }
  }
}
</script>
