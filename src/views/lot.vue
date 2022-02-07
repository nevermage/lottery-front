<template>
  <main>
    <lot-page-edit
      v-if="user.id === lot.creator_id && (lot.status ==='accepted' || lot.status === 'unmoderated')"
      :lot="lot"
    />
    <lot-page-display
      v-else
      :lot="lot"
    />
  </main>
</template>

<script lang="ts">
import {Vue} from "vue-property-decorator";
import {lotsModule, usersModule} from "../store/store";

export default class lot extends Vue{

  mounted() {
    lotsModule.fetchLot(this.$route.params.id)
  }
  get lot() {
    return lotsModule.getLot
  }

  get user() {
    return usersModule.getUserInfo
  }
}

</script>

<style>
.lotPageImage {
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lotPageImage img {
  width: 100%;
  height: auto;
}
</style>