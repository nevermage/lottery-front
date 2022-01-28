<template>
  <div>
    <div
      id="loginFormBackground"
      class="loginFormBackground"
      @click="close"
    />
    <div
      id="loginFormContainer"
      class="loginFormContainer"
    >
      <button
        class="closeLoginFormButton"
        @click="close"
      >
        <svg
          fill="#232323"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24px"
          height="24px"
        >
          <path
            d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"
          />
        </svg>
      </button>
      <password-reset-form
        v-if="formType === 3"
        @back="formType = 2"
        @close="close"
      />
      <login-form
        v-if="formType === 2"
        @forgotPassword="formType = 3"
        @switch="switchForms"
        @close="$emit('close');"
      />
      <reg-form
        v-if="formType === 1"
        @switch="switchForms"
        @close="close"
      />
    </div>
  </div>
</template>

<script>
import LoginForm from "./loginForm";
import RegForm from "./regForm";
import PasswordResetForm from "@/components/passwordResetForm";

export default {
  components: {PasswordResetForm, RegForm, LoginForm},
  emits: ['close'],
  data: function() {
    return  {
      formType: 2
    }
  },
  methods: {
    forgotPassword() {
      console.log('aboba')
    },
    switchForms () {
      if (this.formType === 1) {
        this.formType = 2;
      } else {
        this.formType = 1;
      }
    }
  }
}
</script>

<style>

.fade-enter-active, .fade-leave-active {
  transition: opacity .16s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
