<template>
  <div>
    <form
      class="passwordResetForm"
      @submit.prevent
    >
      <h1>Set new password</h1>
      <h3>New password:</h3>
      <login-input
        v-model="password"
        type="password"
      />
      <h3>Repeat new password:</h3>
      <login-input
        v-model="passwordConfirmation"
        type="password"
      />
      <send-form-button @click="send">
        Confirm
      </send-form-button>
    </form>
  </div>
</template>

<script lang="ts">
import {Vue} from "vue-property-decorator";
import axios from "axios";

export default class passwordReset extends Vue {
  password: string = ''
  passwordConfirmation: string = ''


  async send() {
    if (this.validation()) {
      let params = {
        token: this.$route.params.token,
        password: this.password
      };
      try {
        let response = await axios
            .post(process.env.VUE_APP_BACKEND_URL + '/api/password-reset', params)
            alert(response.data.data);
            this.$router.push({ name: 'feed'});
      } catch (error) {
            alert(error.response.data.error);
      }
    }
  }

  validation() {
    if (this.password !== this.passwordConfirmation) {
      alert('Passwords do not match');
      return false;
    }
    if (this.password.length < 8) {
      alert('Password must be 8 characters at least');
      return false;
    }
    return true;
  }
}
</script>

<style scoped>
form {
  font-family: Helvetica;
}
.passwordResetForm {
  position: absolute;
  background: #f5f5f5;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  border: 2px solid #9b9b9b;
  left: calc(50% - 171px);
  top: calc(50% - 160px)
}
h1 {
  font-size: 24px;
  text-align: center;
  line-height: 36px;
  margin-bottom: 20px;
}

h3 {
  font-size: 20px;
}

</style>