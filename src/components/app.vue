<template>
  <div>
    <transition name="fade">
      <forms
        v-if="isFormVisible"
        @close="closeForm"
      ></forms>
    </transition>

    <xheader
      @show="showForm"
    ></xheader>

    <transition name="fade" mode="in-out">
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
.fade-enter-active, .fade-leave-active {
  transition: opacity .16s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>