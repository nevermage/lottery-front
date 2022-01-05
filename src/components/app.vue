<template>
  <div>
    <login></login>

    <xheader></xheader>

    <router-view></router-view>

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

