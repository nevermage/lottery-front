<template>
  
  <main>
    <div class="profilePageContainer">
      <div class="profilePageImageContainer">
        <img src="" alt="">
      </div>
      <div class="profilePageInfo">
        <strong class="profilePageName">{{ user.name }}</strong>
        <p class="profilePageDate">In Lottery since {{ user.created_at }}</p>
        <div class="profilePageLotsList">
          <strong>Own lotteries</strong>
          <div class="profilePageLinks">
            <router-link
                v-for="lot in own"
                :key="lot.id"
                :to="{name: 'lot', params: {id: lot.id}}">
              {{ lot.name }},
            </router-link>
          </div>
        </div>
        <div class="profilePageLotsList">
          <strong>Won lotteries</strong>
          <div class="profilePageLinks">
            <router-link
                v-for="lot in won"
                :key="lot.id"
                :to="{name: 'lot', params: {id: lot.id}}">
              {{ lot.name }},
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('fetchUser', this.$route.params.id);
    this.$store.dispatch('fetchOwn', this.$route.params.id);
    this.$store.dispatch('fetchWon', this.$route.params.id);
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    own() {
      return this.$store.getters.getOwn;
    },
    won() {
      return this.$store.getters.getWon;
    },
  }
}
</script>