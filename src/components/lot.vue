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
          <button @click="joinLot()" class="lotPageJoinButton">Take part</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import VueCookies from "vue-cookies";

export default {
  mounted() {
    this.$store.dispatch('fetchLot', this.$route.params.id);
  },
  computed: {
    lot() {
      return this.$store.getters.getLot;
    },
  },
  methods: {
    joinLot() {
      let token = VueCookies.get('token');
      axios
          .post("http://localhost/api/ljoin/" + this.$route.params.id + '?token=' + token)
          .then((data) => {
            alert(data.data.data);
          })
          .catch((error) => {
            alert(error.response.data.data);
          });
    }
  }
}
</script>
