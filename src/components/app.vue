<template>
  <div>
    <forms
      v-show="isFormVisible"
      @close="closeForm"
    ></forms>

    <xheader
      @show="showForm"
    ></xheader>

    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>

    <xfooter></xfooter>
  </div>
</template>

<script>
import xheader from './header';
import xfooter from './footer';
import forms from './loginAndRegisterForms';

export default {
  components: {
    xheader,
    xfooter,
    forms,
  },
  data() {
    return {
      isFormVisible: false,
      formType: 1
    }
  },
  methods: {
    showForm() {
      this.isFormVisible = true;
    },
    closeForm() {
      this.isFormVisible = false;
    },
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>