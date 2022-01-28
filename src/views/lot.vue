<template>
  <main>
    <div class="lotPageContainer">
      <h1 class="lotPageTitle">
        {{ lot.name }}
      </h1>
      <div class="lotPageGrid">
        <div class="lotPageImage">
          <img
            :src="lot.image_path"
            alt=""
          >
        </div>
        <div class="lotPageInfo">
          <p class="lotPageDescription">
            {{ lot.description }}
          </p>
          <p class="lotPageAuthorName">
            Created by: {{ lot.creator }}
          </p>
          <div class="lotPageRollTimerContainer">
            <strong class="lotPageRoll">Roll timer:</strong>
            <strong class="lotPageTimer">{{ timer }}</strong>
          </div>
          <button
            class="lotPageJoinButton"
            @click="joinLot()"
          >
            Take part
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import VueCookies from "vue-cookies";

export default {
  data() {
    return {
      timer: 111
    }
  },
  computed: {
    lot() {
      return this.$store.getters.getLot;
    },
  },
  created() {
    this.countDownTimer();
  },
  mounted() {
    this.$store.dispatch('fetchLot', this.$route.params.id);
  },
  methods: {
    setTimer(time) {
      this.timer = time;
    },
    joinLot() {
      let token = VueCookies.get('token');
      if (!token) {
        alert('Only authorized users can join to lot');
        return
      }
      axios
          .post(process.env.VUE_APP_BACKEND_URL + '/api/join/' + this.$route.params.id, [],
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
