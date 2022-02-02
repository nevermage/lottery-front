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
            @click="joinLot"
          >
            Take part
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import {Vue} from "vue-property-decorator";
import {lotsModule} from "../store/store";
import axios from "axios";
import {VueCookieNext} from "vue-cookie-next";

export default class lot extends Vue{
  timer: number = 1

  async mounted() {
    await lotsModule.fetchLot(this.$route.params.id)
    this.countDownTimer();
  }
  get lot() {
    let lot = lotsModule.getLot
    this.timer = lot['roll_time']
    return lot
  }

  setTimer(time) {
    this.timer = time;
  }

  async joinLot() {
    let token = VueCookieNext.getCookie('token');
    if (!token) {
      alert('Only authorized users can join to lot');
      return
    }
    try {
      let response = await axios
          .post(process.env.VUE_APP_BACKEND_URL + '/api/join/' + this.$route.params.id, [],
              {'headers': {'Authorization': 'Bearer ' + token}})
      alert(response.data.data);
    } catch (error) {
      alert(error.response.data.data);
    }
  }
  countDownTimer() {
    if (this.timer > 0) {
      setTimeout(() => {
        this.timer -= 1
        this.countDownTimer()
      }, 1000)
    }
  }

}
</script>
