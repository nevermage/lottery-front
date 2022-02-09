<template>
  <main>
    <div class="profilePageContainer">
      <div class="profilePageImageContainer">
        <img
          v-if="user.image_path && user.image_path.includes('http')"
          :src="user.image_path"
          alt=""
        >
        <img
          v-else-if="user.image_path"
          :src="storageUrl + user.image_path"
          alt=""
        >
        <img
          v-else
          :src="storageUrl + 'users/default/image.png'"
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
            <div v-if="userInfo.id === user.id">
              <router-link
                v-for="lot in myLots"
                :key="lot.id"
                :to="{name: 'lot', params: {id: lot.id}}"
              >
                {{ lot.name }},
              </router-link>
            </div>
            <div v-else>
              <router-link
                v-for="lot in ownLots"
                :key="lot.id"
                :to="{name: 'lot', params: {id: lot.id}}"
              >
                {{ lot.name }},
              </router-link>
            </div>
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
  storageUrl = process.env.VUE_APP_MINIO_URL

  mounted() {
    usersModule.fetchUser(this.$route.params.id)
    usersModule.fetchUserInfo()
    lotsModule.fetchOwnLots(this.$route.params.id)
    lotsModule.fetchMyLots()
    lotsModule.fetchWonLots(this.$route.params.id)
  }

  get user() {
    return usersModule.getUser
  }
  get userInfo() {
    return usersModule.getUserInfo
  }
  get myLots() {
    return lotsModule.getMyLots
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

<style>
.profilePageImageContainer {
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}


.profilePageImageContainer img {
  width: 100%;
}
</style>