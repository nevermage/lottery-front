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
            <strong class="lotPageTimer">{{ timer }}</strong>
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
  created() {
    this.countDownTimer();
  },
  mounted() {
    this.$store.dispatch('fetchLot', this.$route.params.id);
  },
  computed: {
    lot() {
      let lot = this.$store.getters.getLot;
      if (lot.roll_time) {
        this.timer = lot.roll_time;
      }
      return lot;
    },
  },
  data() {
    return {
      timer: 1,
    }
  },
  methods: {
    joinLot() {
      let token = VueCookies.get('token');
      if (!token) {
        alert('Only authorized users can join to lot');
        return
      }
      axios
          .post("http://localhost/api/join/" + this.$route.params.id, [],
              {'headers': {'Authorization': 'Bearer ' + token}})
          .then((data) => {
            alert(data.data.data);
          })
          .catch((error) => {
            alert(error.response.data.data);
          });
    },
    countDownTimer() {
      if (this.timer > 0) {
        setTimeout(() => {
          this.timer -= 1
          this.countDownTimer()
        }, 1000)
      }
    }
  }
}
</script>
