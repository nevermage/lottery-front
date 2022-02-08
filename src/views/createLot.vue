<template>
  <main>
    <div class="createLotContainer">
      <div class="createLeftContainer">
        <div class="createLotImageContainer">
          <img
            id="createLotImagePreview"
            src=""
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
        <crop-image />
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
        <send-form-button @click="createLot">
          Create
        </send-form-button>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import {Vue} from "vue-property-decorator";
import axios from "axios";
import {VueCookieNext} from "vue-cookie-next";


export default class createLot extends Vue {
  file = null
  name: string = ''
  description: string = ''

  async createLot() {
    try {
      let response = await axios.post(
          process.env.VUE_APP_BACKEND_URL + '/api/create',
          this.formData() , {
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
    if (this.file !== null) {
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

<style>
.createLotRightContainer button {
  margin-top: 20px;
}

.createLotRightContainer textarea {
  margin-top: 5px;
  font-size: 22px;
  padding: 10px;
  resize: none;
  width: calc(100% - 24px);
  height: 200px;
  border-radius: 6px;
}

.createLeftContainer input {
  font-size: 24px;
}

.createLotRightContainer h2 {
  font-family: Rosario;
  font-size: 28px;
}

.createLotRightContainer {
  padding: 20px;
}

.createLotImageContainer {
  border-radius: 5px;
  height: 400px;
  width: 400px;
  overflow: hidden;
  border: 2px solid #ccc;
  background: #ddd;
  box-shadow: #7b7b7b 0 0 5px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.createLotImageContainer img {
  max-width: 100%;
  width: 100%;

}

.createLotContainer {
  display: grid;
  grid-template-columns: 500px 1fr;
  grid-column-gap: 50px;
  margin-top: 10px;
  padding: 50px;
  background: #fff4e3;
  border-radius: 10px;
  margin-bottom: 45px;
  box-shadow: 0 0 10px #ccc;
  overflow: hidden;
}

</style>