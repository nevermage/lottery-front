<template>
  <div>
    <div id="loginFormBackground" class="loginFormBackground" onclick="closeLoginForm()"></div>
    <div id="loginFormContainer" class="loginFormContainer">
      <button class="closeLoginFormButton" onclick="closeLoginForm()">
        <svg fill="#232323" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px"><path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"/></svg>
      </button>
      <div id="loginDataContainer">
        <div class="loginFormHead">
          <div class="loginFormHeadGrid">
            <strong class="loginFormLabel">Log In</strong>
            <a class="loginFormHeadSwitcher" onclick="switchForms()">Sign Up</a>
          </div>
        </div>
        <div class="loginForm">
          <p class="loginFormInputTitle">username:</p>
          <input class="loginFormInput" v-model="loginEmail" type="text" placeholder="username">
          <p class="loginFormInputTitle">password:</p>
          <input class="loginFormInput" v-model="loginPassword" type="password" placeholder="***************">
          <button class="loginFormButton" @click="login()">Log In</button>
        </div>
      </div>
      <div id="regDataContainer">
        <div class="loginFormHead">
          <div class="loginFormHeadGrid">
            <strong class="loginFormLabel">Sign Up</strong>
            <a class="loginFormHeadSwitcher" onclick="switchForms()">Log In</a>
          </div>
        </div>
        <div class="loginForm">
          <p class="loginFormInputTitle">username:</p>
          <input class="loginFormInput" v-model="name" type="text" placeholder="username">
          <p class="loginFormInputTitle">email:</p>
          <input class="loginFormInput" v-model="email" type="text" placeholder="exmaple@gmail.com">
          <p class="loginFormInputTitle">password:</p>
          <input class="loginFormInput" v-model="password" type="password" placeholder="***************">
          <p class="loginFormInputTitle">password confirmation:</p>
          <input class="loginFormInput" v-model="passwordConfirm" type="password" placeholder="***************">
          <button class="loginFormButton" @click="register()">Sign Up</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
export default {
  data: function() {
    return  {
      loginPassword: [],
      loginEmail: [],

      name: [],
      email: [],
      password: [],
      passwordConfirm: [],
    }
  },
  methods: {
    register() {
      axios
          .post("http://localhost/api/register", {
            email: this.email,
            name: this.name,
            password: this.password,
            password_confirmation: this.passwordConfirm,
          })
          .then((data) => {
            alert(data.data.data);
          })
          .catch((error) => {
            if (typeof error.response.data.errors !== 'undefined') {
              if (typeof error.response.data.errors.password !== 'undefined') {
                this.password = [];
                this.passwordConfirm = [];
              }
            }
            alert(
                error.response.data.message
                    ? Object.values(error.response.data.errors)[0][0]
                    : error.response.data.data
            );
          });
    },
    login() {
      axios
          .post("http://localhost/api/login", {
            email: this.loginEmail,
            password: this.loginPassword,
          })
          .then((data) => {
            console.log(data.data);
          })
          .catch((error) => {
            this.loginPassword = [];
            alert(
                error.response.data.message
                    ? Object.values(error.response.data.errors)[0][0]
                    : error.response.data.data
            );
          });
    },
  }
}
</script>