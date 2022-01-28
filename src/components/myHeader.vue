<template>
  <header>
    <div class="headerContent">
      <router-link
        id="headerLogo"
        :to="{name: 'feed'}"
      >
        Lottery
      </router-link>
      <searcher />
      <router-link
        v-if="user.role_id === 2"
        :to="{name: 'admin'}"
        class="headerLoginButton"
      >
        Admin
      </router-link>
      <router-link
        v-if="user.role_id"
        :to="{name: 'profile', params: {id: user.id}}"
        class="headerLoginButton"
      >
        {{ user.name }}
      </router-link>
      <a
        v-if="user === 'UnAuthenticated'"
        class="headerLoginButton"
        @click="show"
      >Log in</a>
    </div>
  </header>
</template>

<script>
import searcher from "./searcher";
export default {
  components: {searcher},
  emits: ['show'],
  computed: {
    user() {
      return this.$store.getters.getUserInfo;
    }
  },
  mounted() {
    this.$store.dispatch('fetchUserInfo');
  },
  methods: {
    show() {
      this.$emit('show')
    }
  }
}
</script>

