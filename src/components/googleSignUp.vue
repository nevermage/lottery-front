<template>
  <div>
    <button
      class="google-button"
      @click="handleClickSignIn"
    >
      Sign in with google
    </button>
  </div>
</template>

<script lang="ts">
import {Vue} from "vue-property-decorator";
import {VueCookieNext} from "vue-cookie-next";
import {usersModule} from "../store/store";

export default class googleSignUp extends Vue {
  $gAuth: any;

  async handleClickSignIn() {
    try {
      const googleUser = await this.$gAuth.signIn();
      if (!googleUser) {
        return null;
      }

      let googleToken = (googleUser.getAuthResponse()).id_token;

      const response = await fetch(
          process.env.VUE_APP_BACKEND_URL + '/api/google-login?token=' + googleToken);
      let tokenObj = await response.json();

      VueCookieNext.setCookie('token', tokenObj.token);
      await usersModule.fetchUserInfo()
      this.$emit('close');

    } catch (error) {
      return null;
    }
  }
}
</script>

<style>
.google-button {
  margin-bottom: 6px;
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
</style>