<template>
  <main>
    <div class="profilePageContainer">
      <div class="profilePageImageContainer">
        <img
          :src="user.image_path"
          alt=""
        >
      </div>
      <div class="profilePageInfo">
        <strong class="profilePageName">{{ user.name }}</strong>
        <p class="profilePageDate">
          In Lottery since {{ user.created_at }}
        </p>
        <div class="profilePageLotsList">
          <strong>Own lotteries</strong>
          <div class="profilePageLinks">
            <router-link
              v-for="lot in ownLots"
              :key="lot.id"
              :to="{name: 'lot', params: {id: lot.id}}"
            >
              {{ lot.name }},
            </router-link>
          </div>
        </div>
        <div class="profilePageLotsList">
          <strong>Won lotteries</strong>
          <div class="profilePageLinks">
            <router-link
              v-for="lot in wonLots"
              :key="lot.id"
              :to="{name: 'lot', params: {id: lot.id}}"
            >
              {{ lot.name }},
            </router-link>
          </div>
        </div>
        <div
          v-show="userInfo.id == user.id"
          class="logoutButtonContainer"
        >
          <button
            class="logoutButton"
            @click="logout()"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import {Vue} from "vue-property-decorator";
import {usersModule, lotsModule} from "../store/store";
import {VueCookieNext} from "vue-cookie-next";

export default class profile extends Vue {
  mounted() {
    usersModule.fetchUser(this.$route.params.id)
    usersModule.fetchUserInfo()
    lotsModule.fetchOwnLots(this.$route.params.id)
    lotsModule.fetchWonLots(this.$route.params.id)
  }

  get user() {
    return usersModule.getUser
  }
  get userInfo() {
    return usersModule.getUserInfo
  }
  get ownLots() {
    return lotsModule.getOwnLots
  }
  get wonLots() {
    return lotsModule.getWonLots
  }

  logout() {
    VueCookieNext.removeCookie('token')
    usersModule.fetchUserInfo()
  }
}
</script>