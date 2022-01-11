<template>
  <div>
    <login></login>

    <xheader></xheader>

    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>

    <xfooter></xfooter>
  </div>
</template>

<script>
import xheader from './header';
import xfooter from './footer';
import login from './loginForm';

export default {
  components: {
    xheader,
    xfooter,
    login,
  },
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