<template>
  <div>
    <div class="loginFormHead">
      <div class="loginFormHeadGrid">
        <strong class="loginFormLabel">Log In</strong>
        <a
          class="loginFormHeadSwitcher"
          @click="switchForms"
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

      <google-sign-up @close="close" />
      <facebook-sign-up @close="close" />
      <a @click="$emit('forgotPassword')">Forgot password?</a>

      <send-form-button @click="login">
        Log In
      </send-form-button>
    </div>
  </div>
</template>

<script>
import VueCookies from 'vue-cookies';
import axios from 'axios'

export default {
  emits: ['forgotPassword', 'switch', 'close', 'forgot'],
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
      this.password = '';
      this.email = '';
    },
    async forgotPassword() {
      this.$emit('forgot');
    },
    login() {
      axios
        .post(process.env.VUE_APP_BACKEND_URL + '/api/login', {
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

<style scoped>
.loginForm a {
  text-decoration: underline;
}
</style>
