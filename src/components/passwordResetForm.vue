<template>
  <div class="resetForm">
    <h1>Enter your email</h1>
    <a @click="$emit('back')">go back</a>
    <login-input v-model="email" />
    <send-form-button @click="sendMail">
      Send
    </send-form-button>
  </div>
</template>

<script>
export default {
  name: 'PasswordResetForm',
  emits: ['back', 'close'],
  data() {
    return {
      email: ''
    }
  },
  methods: {
    async sendMail() {
      const responseObj = await fetch(process.env.VUE_APP_BACKEND_URL + '/api/password-reset-mail?email=' + this.email);
      let response = await responseObj.json();
      if (response.error) {
        alert(response.error);
        return;
      }
      alert(response.data);
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
.resetForm {
  border-radius: 10px;
  width: 310px;
  padding: 20px;
  position: absolute;
  text-align: center;
  background: #f5f5f5;
}
h1 {
  font-size: 28px;
}
a {
  text-decoration: underline;
}
</style>