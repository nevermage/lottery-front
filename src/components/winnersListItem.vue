<template>
  <tr>
    <td>
      <div class="rightCellContainer">
        <div class="lotteryCellImageContainer">
          <img
            v-if="winner.userImage && winner.userImage.includes('http')"
            :src="winner.userImage"
            alt=""
          >
          <img
            v-else-if="winner.userImage"
            :src="url + '/storage/' + winner.userImage"
            alt=""
          >
          <img
            v-else
            :src="url + '/storage/users/default/image.png'"
          >
        </div>
        <router-link
          :to="{name: 'profile', params: {id: winner.id}}"
        >
          {{ winner.name }}
        </router-link>
      </div>
    </td>
    <td class="lotteryRightCell">
      <div class="rightCellContainer">
        <div class="lotteryCellImageContainer">
          <img
            v-if="winner.image_path"
            :src="url + '/storage/' + winner.image_path"
            alt=""
          >
          <img
            v-else
            :src="url + '/storage/lots/default/image.jpg'"
          >
        </div>
        <router-link
          :to="{name: 'lot', params: {id: winner.lid}}"
        >
          {{ winner.lot }}
        </router-link>
      </div>
    </td>
  </tr>
</template>

<script lang="ts">
import {Prop, Vue} from "vue-property-decorator";

export default class winnersListItem extends Vue {
  url = process.env.VUE_APP_BACKEND_URL

  @Prop (Object) winner: object
}
</script>

<style>
.lotteryCellImageContainer {
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lotteryCellImageContainer img {
  width: 100%;
  height: auto;
}
</style>