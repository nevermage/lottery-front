<template>
  <div>
    <div id="loginFormBackground" class="loginFormBackground" @click="close"></div>
    <div id="loginFormContainer" class="loginFormContainer">
      <button class="closeLoginFormButton" @click="close">
        <svg fill="#232323" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px"><path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"/></svg>
      </button>
      <login-form
          v-if="this.formType === 2"
          @switch="switchForms"
          @close="close"
      />
      <reg-form
          v-if="this.formType === 1"
          @switch="switchForms"
          @close="close"
      />
    </div>
  </div>
</template>

<script>
import LoginForm from "./loginForm";
import RegForm from "./regForm";

export default {
  components: {RegForm, LoginForm},
  data: function() {
    return  {
      formType: 2
    }
  },
  methods: {
    close () {
      this.$emit('close');
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
