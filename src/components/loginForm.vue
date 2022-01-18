<template>
  <div id="loginDataContainer">
    <div class="loginFormHead">
      <div class="loginFormHeadGrid">
        <strong class="loginFormLabel">Log In</strong>
        <a class="loginFormHeadSwitcher" @click="switchForms">Sign Up</a>
      </div>
    </div>
    <div class="loginForm">
      <p class="loginFormInputTitle">username:</p>
      <input class="loginFormInput" v-model="loginEmail" type="text" placeholder="username">
      <p class="loginFormInputTitle">password:</p>
      <input class="loginFormInput" v-model="loginPassword" type="password" placeholder="***************">
      <g-signin-button
          class="google-button"
          :params="googleSignInParams"
          @success="onSignInSuccess"
          @error="onSignInError">
        Sign in with Google
      </g-signin-button>
      <button class="loginFormButton" @click="login()">Log In</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    switchForms() {
      this.$emit('switchForms');
    }
  }
}
</script>