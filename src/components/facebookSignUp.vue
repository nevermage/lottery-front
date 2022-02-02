<template>
  <button
    class="fb-button"
    @click="signup"
  >
    Login with Facebook
  </button>
</template>

<script lang="ts">
import {Vue} from "vue-property-decorator";
import {usersModule} from "../store/store";
import {VueCookieNext} from "vue-cookie-next";

export default class facebookSignUp extends Vue {


  signup() {
    this.logInWithFacebook();

    setTimeout(() => {
      this.logInWithFacebook();
    }, 100);
  }

  async logInWithFacebook() {
    await this.loadFacebookSDK(document, "script", "facebook-jssdk");
    await this.initFacebook();
    await window['FB'].login((response) => {
      if (response.authResponse) {
        let fbToken = response.authResponse.accessToken;
        this.signUpViaToken(fbToken);
        this.$emit('close');
      } else {
        console.log("User cancelled login or did not fully authorize.");
      }
    });
    return false;
  }

  async initFacebook() {
    window['fbAsyncInit'] = function () {
      window['FB'].init({
        appId: process.env.VUE_APP_FACEBOOK_CLIENT_ID,
        cookie: process.env.VUE_APP_FACEBOOK_CLIENT_COOKIE,
        version: process.env.VUE_APP_FACEBOOK_CLIENT_VERSION
      });
    };
  }

  async loadFacebookSDK(d, s, id) {
    let js,
        fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }

  async signUpViaToken(fbToken) {
    const response = await fetch(process.env.VUE_APP_BACKEND_URL
        + '/api/facebook-login?token=' + fbToken);
    let token = await response.json();
    VueCookieNext.setCookie('token', token);
    await usersModule.fetchUserInfo()
  }
}
</script>

<style>

.fb-button {
  display: inline-block;
  color: white;
  min-width: 110px;
  background-color: #000000a1;
  height: 2.5rem;
  border-radius: 2rem;
  font-weight: 400;
  font-size: 0.8rem;
}
</style>