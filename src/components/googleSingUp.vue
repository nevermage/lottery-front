<template>
  <g-signin-button
      class="google-button"
      :params="googleSignInParams"
      @success="onSignInSuccess"
      @error="onSignInError">
    Sign in with Google
  </g-signin-button>
</template>

<script>
import VueCookies from 'vue-cookies';

export default {
  data: function() {
    return {
      googleSignInParams: {
        client_id: '127852352293-vrp8o5lucuoo6qe86i52u8okp9gb7ctt.apps.googleusercontent.com'
      },
    }
  },
  methods: {
    async onSignInSuccess(googleUser) {
      let googleToken = (googleUser.getAuthResponse()).id_token;
      const response = await fetch('http://localhost/api/google-login?token=' + googleToken);
      let token = await response.json();

      VueCookies.set('token', token);
      this.$store.dispatch('fetchUserInfo');
      this.$emit('close');
    },
    onSignInError(error) {},
  }
}
</script>

<style>

.google-button {
  text-decoration: underline;
  cursor: pointer;
  margin-bottom: 6px;
}
</style>