<template>
  <div>
    <div class="loginFormHead">
      <div class="loginFormHeadGrid">
        <strong class="loginFormLabel">Sign Up</strong>
        <a class="loginFormHeadSwitcher" @click="switchForms">Log In</a>
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
</template>

<script>
import axios from 'axios'

export default {
  data: function() {
    return {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    }
  },
  methods: {
    switchForms() {
      this.$emit('switch');
    },
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
            this.$emit('close');
            this.clearRegisterData();
          })
          .catch((error) => {
            if (typeof error.response.data.errors !== 'undefined') {
              if (typeof error.response.data.errors.password !== 'undefined') {
                this.password = '';
                this.passwordConfirm = '';
              }
            }
            alert(
                error.response.data.message
                    ? Object.values(error.response.data.errors)[0][0]
                    : error.response.data.data
            );
          });
    },
    clearRegisterData () {
      this.name = [];
      this.email = [];
      this.password = [];
      this.passwordConfirm = [];
    },
  }
}

</script>