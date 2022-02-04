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
      <button @click="deleteImage">Delete image</button>
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

export default class lotPageEdit extends Vue {
  url = process.env.VUE_APP_BACKEND_URL
  file = null
  name: string = ''
  description: string = ''
  image = null

  @Prop(Object) lot: object

  mounted() {
    this.name = this.lot['name']
    this.description = this.lot['description']
    this.image = this.lot['image_path']
        ? this.url + '/storage/' + this.lot['image_path']
        : this.url + '/storage/lots/default/image.jpg'
  }

  deleteImage() {
    this.file = null
    this.image = this.url + '/storage/lots/default/image.jpg'
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
      alert(response.data.data)
    } catch (error) {
      alert(
          error.response.data.message
              ? Object.values(error.response.data.errors)[0][0]
              : error.response.data.data
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