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
        @click="$emit('show')"
      >Log in</a>
    </div>
  </header>
</template>

<script lang="ts">
import {Vue} from "vue-property-decorator"
import {usersModule} from "../store/store";

export default class myHeader extends Vue {
  mounted() {
    usersModule.fetchUserInfo()
  }
  get user() {
    return usersModule.getUserInfo
  }
}
</script>

