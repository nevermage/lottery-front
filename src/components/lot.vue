<template>
  <main>
    <div class="lotPageContainer">
      <h1 class="lotPageTitle">{{ lot.name }}</h1>
      <div class="lotPageGrid">
        <div class="lotPageImage">
          <img v-bind:src="lot.image_path" alt="">
        </div>
        <div class="lotPageInfo">
          <p class="lotPageDescription">{{ lot.description }}</p>
          <p class="lotPageAuthorName">Created by: {{ lot.creator }}</p>
          <div class="lotPageRollTimerContainer">
            <strong class="lotPageRoll">Roll timer:</strong>
            <strong class="lotPageTimer">{{ lot.roll_time }}</strong>
          </div>
          <button class="lotPageJoinButton">Take part</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('fetchLot', this.$route.params.id);
  },
  computed: {
    lot() {
      return this.$store.getters.getLot;
    },
  }
}
</script>
