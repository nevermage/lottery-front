<template>
  <div>
    <div class="loginFormHead">
      <div class="loginFormHeadGrid">
        <strong class="loginFormLabel">Log In</strong>
        <a
          class="loginFormHeadSwitcher"
          @click="$emit('switch')"
        >Sign Up</a>
      </div>
    </div>
    <div class="loginForm">
      <p class="loginFormInputTitle">
        email:
      </p>
      <login-input
        v-model="email"
        placeholder="email"
      />
      <p class="loginFormInputTitle">
        password:
      </p>
      <login-input
        v-model="password"
        placeholder="***********"
        type="password"
      />

      <google-sign-up @close="$emit('close')" />
      <facebook-sign-up @close="$emit('close')" />
      <a @click="$emit('forgotPassword')">Forgot password?</a>

      <send-form-button @click="login">
        Log In
      </send-form-button>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue} from "vue-property-decorator";
import axios from 'axios'
import {usersModule} from "../store/store";
import {VueCookieNext} from "vue-cookie-next";

export default class loginForm extends Vue {
  email: string = ''
  password: string = ''


  clearLoginData() {
    this.email = ''
    this.password = ''
  }

  async login() {
    try {
      const response = await axios
          .post(process.env.VUE_APP_BACKEND_URL + '/api/login', {
            email: this.email,
            password: this.password,
          });

      VueCookieNext.setCookie('token', response.data.token)
      await usersModule.fetchUserInfo()
      this.$emit('close')
      this.clearLoginData();
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

<style scoped>
.loginForm a {
  text-decoration: underline;
}
</style>
