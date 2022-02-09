<template>
  <div class="lotPageContainer">
    <h1 class="lotPageTitle">
      {{ lot.name }}
    </h1>
    <div class="lotPageGrid">
      <div class="lotPageImage">
        <img
          v-if="lot.image_path"
          :src="storageUrl + lot.image_path"
          alt=""
        >
        <img
          v-else
          :src="storageUrl + 'lots/default/image.jpg'"
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
</template>

<script lang="ts">
import {Prop, Vue} from "vue-property-decorator";
import {VueCookieNext} from "vue-cookie-next";
import axios from "axios";

export default class lotPageData extends Vue {
  storageUrl = process.env.VUE_APP_MINIO_URL
  timer: number = 1

  @Prop(Object) lot: object

  mounted() {
    this.countDownTimer();
    setTimeout(() => {
      this.timer = this.lot['roll_timer']
    }, 100)
  }

  countDownTimer() {
    if (this.timer > 0) {
      setTimeout(() => {
        this.timer -= 1
        this.countDownTimer()
      }, 1000)
    }
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

}

</script>