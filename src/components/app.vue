<template>
  <div>
    <xheader></xheader>

    <router-view></router-view>

    <xfooter></xfooter>
  </div>
</template>

<script>
import xheader from './header';
import xfooter from './footer';
export default {
  components: {
    xheader,
    xfooter
  }
}
</script>

