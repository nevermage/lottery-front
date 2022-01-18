<template>
  <header>
    <div class="headerContent">
      <router-link :to="{name: 'feed'}" id="headerLogo">Lottery</router-link>
      <router-link v-if="user.role_id == 2" :to="{name: 'admin'}" class="headerLoginButton">Admin</router-link>
      <router-link v-if="user.role_id" :to="{name: 'profile', params: {id: user.id}}" class="headerLoginButton">{{ user.name }}</router-link>
      <a v-if="user == 'UnAuthenticated'" class="headerLoginButton" @click="show">Log in</a>
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
  },
  methods: {
    show() {
      this.$emit('show')
    }
  }
}
</script>
