<template>
  <header>
    <div class="headerContent">
      <router-link :to="{name: 'feed'}" id="headerLogo">Lottery</router-link>
      <router-link v-if="user.id" :to="{name: 'profile', params: {id: user.id}}" class="headerLoginButton">{{ user.name }}</router-link>
      <a v-if="user == 'UnAuthenticated'" class="headerLoginButton" onclick="showLoginForm()">Log in</a>
    </div>
  </header>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('fetchUserInfo');
  },
  computed: {
    user() {
      return this.$store.getters.getUserInfo;
    },
  }
}
</script>
