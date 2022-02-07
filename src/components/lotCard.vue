<template>
  <ul class="lotGridCard">
    <div class="lotGridCardImgContainer">
      <img
        v-if="lot.image_path"
        :src="url + '/storage/' + lot.image_path"
        alt="lot image"
      >
      <img
        v-else
        :src="url + '/storage/lots/default/image.jpg'"
        alt="lot image"
      >
    </div>
    <div class="lotGridCardInfo">
      <strong>{{ lot.name }}</strong>
      <div class="lotGridCardInfoBot">
        <p>by {{ lot.creator }}</p>
        <router-link :to="{name: 'lot', params: {id: lot.id}}">
          Join
        </router-link>
      </div>
    </div>
  </ul>
</template>

<script lang="ts">
import { Vue, Prop } from 'vue-property-decorator'

export default class lotCard extends Vue {
  url = process.env.VUE_APP_BACKEND_URL
  @Prop (Object) lot: object
}

</script>

<style>
.lotGridCardImgContainer {
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lotGridCardImgContainer img {
  width: 100%;
  height: auto;
}
</style>