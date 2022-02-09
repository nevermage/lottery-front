<template>
  <div class="createLotContainer">
    <div class="createLeftContainer">
      <div class="createLotImageContainer">
        <img
          id="createLotImagePreview"
          :src="image"
          alt=""
        >
      </div>
      <input
        id="fileHandler"
        type="file"
        name="inputImg"
        accept="image/png, image/jpeg"
        @change="fileUpload"
      >
      <button @click="deleteImage">
        Delete image
      </button>
      <div
        v-if="lot.status === 'accepted'"
        class="launchLot"
      >
        <h2>Your lot is ready to launch!</h2>
        <h3>Set time and press launch</h3>
        <Datepicker
          v-model="date"
        />
        <send-form-button
          @click="launch"
        >
          Launch
        </send-form-button>
      </div>
    </div>
    <div class="createLotRightContainer">
      <h2>Lot name:</h2>
      <login-input
        v-model="name"
        placeholder="name"
      />
      <h2>Lot description:</h2>
      <textarea
        v-model="description"
        placeholder="lot description"
      />
      <send-form-button @click="updateLot">
        Update
      </send-form-button>
    </div>
  </div>
</template>

<script lang="ts">
import {Prop, Vue} from "vue-property-decorator";
import axios from "axios";
import {VueCookieNext} from "vue-cookie-next";
import {lotsModule} from "../store/store";

export default class lotPageEdit extends Vue {
  apiUrl = process.env.VUE_APP_BACKEND_URL
  storageUrl = process.env.VUE_APP_MINIO_URL
  file = null
  name: string = ''
  description: string = ''
  image = null
  date = null

  @Prop(Object) lot: object

  getDate() {
    let rollTime = ''
    rollTime += this.date.toISOString().replace('T', ' ')
    rollTime = rollTime.substr(0, rollTime.lastIndexOf('.'))

    return rollTime
  }

  mounted() {
    this.name = this.lot['name']
    this.description = this.lot['description']
    this.image = this.lot['image_path']
        ? this.storageUrl + this.lot['image_path']
        : this.storageUrl + 'lots/default/image.jpg'
  }

  deleteImage() {
    this.file = null
    this.image = this.storageUrl + 'lots/default/image.jpg'
  }

  async updateLot() {
    try {
      let response = await axios.post(
          process.env.VUE_APP_BACKEND_URL + '/api/update/' + this.$route.params.id,
          this.formData(), {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': 'Bearer ' + VueCookieNext.getCookie('token')
            }
          })
      lotsModule.fetchLot(this.lot['id']);
      alert(response.data.data)
    } catch (error) {
      alert(
          error.response.data.message
              ? Object.values(error.response.data.errors)[0][0]
              : error.response.data.data
      );
    }
  }

  async launch() {
    if (this.date === null) {
      alert('Set date firstly!')
      return
    }
    try {
      let response = await axios.post(this.apiUrl + '/api/set-roll-time/' + this.lot['id'],
          {
            'time': this.getDate()
          },
          {
            headers: {
              'Authorization': 'Bearer ' + VueCookieNext.getCookie('token')
            }
          });
      lotsModule.fetchLot(this.lot['id']);
      alert(response.data.data)
    } catch (error) {
      alert(
          error.response.data.message
              ? Object.values(error.response.data.errors)[0][0]
              : error.response.data.error
      );
    }
  }

  formData() {
    const data = new FormData()
    data.append('name', this.name)
    if (this.description !== '') {
      data.append('description', this.description)
    }
    if (this.file === null) {
      data.append('imageFile', null)
    } else {
      data.append('imageFile', this.file)
    }
    return data
  }

  fileUpload(e) {
    if(e.target.files.length > 0){
      this.file = e.target.files[0]
      const preview = document.getElementById('createLotImagePreview')
      preview['src'] = URL.createObjectURL(e.target.files[0]);
    }
  }
}

</script>

<style scoped>
.launchLot {
  padding: 10px;
  font-size: 30px;
}

.launchLot > * {
  margin: 10px 0;
}
</style>