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

<script>
import VueCookies from "vue-cookies";

export default {
  name: 'google-sign-up',
  methods: {
    async handleClickSignIn() {
      try {
        const googleUser = await this.$gAuth.signIn();
        if (!googleUser) {
          return null;
        }

        let googleToken = (googleUser.getAuthResponse()).id_token;

        const response = await fetch('http://localhost/api/google-login?token=' + googleToken);
        let token = await response.json();

        VueCookies.set('token', token);
        this.$store.dispatch('fetchUserInfo');
        this.$emit('close');

      } catch (error) {
        return null;
      }
    }
  }
};
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