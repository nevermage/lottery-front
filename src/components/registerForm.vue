<template>
  <div>
    <div class="loginFormHead">
      <div class="loginFormHeadGrid">
        <strong class="loginFormLabel">Sign Up</strong>
        <a
          class="loginFormHeadSwitcher"
          @click="$emit('switch')"
        >Log In</a>
      </div>
    </div>
    <div class="loginForm">
      <p class="loginFormInputTitle">
        username:
      </p>
      <login-input
        v-model="name"
        placeholder="username"
      />
      <p class="loginFormInputTitle">
        email:
      </p>
      <login-input
        v-model="email"
        placeholder="exmaple@gmail.com"
      />
      <p class="loginFormInputTitle">
        password:
      </p>
      <login-input
        v-model="password"
        type="password"
        placeholder="***************"
      />
      <p class="loginFormInputTitle">
        password confirmation:
      </p>
      <login-input
        v-model="passwordConfirm"
        type="password"
        placeholder="***************"
      />
      <send-form-button @click="register">
        Sign Up
      </send-form-button>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'

import {Vue} from "vue-property-decorator";

export default class registerForm extends Vue {
  name: string = ''
  email: string = ''
  password: string = ''
  passwordConfirm: string = ''

  clearRegisterData() {
    this.name = '';
    this.email = '';
    this.password = '';
    this.passwordConfirm = '';
  }

  async register() {
    try {
      let response = await axios
          .post(process.env.VUE_APP_BACKEND_URL + '/api/register', {
            email: this.email,
            name: this.name,
            password: this.password,
            password_confirmation: this.passwordConfirm,
          })
      alert(response.data.data);
      this.$emit('close');
      this.clearRegisterData();
    } catch (error) {
      alert(
          error.response.data.message
              ? Object.values(error.response.data.errors)[0][0]
              : error.response.data.data
      );
    }
  }
}
</script>