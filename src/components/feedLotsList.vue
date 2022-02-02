<template>
  <main>
    <div class="feedBanner">
      <img
        src="/src/images/banner1.png"
        alt=""
      >
    </div>
    <div class="lotsContainer">
      <div class="lotsContainerHead">
        <strong>Lots to play</strong>
      </div>
      <li class="lotGrid">
        <lot-card
          v-for="lot in lots"
          :key="lot.id"
          :lot="lot"
        />
      </li>
    </div>
  </main>
</template>

<script lang="ts">
import {Vue} from "vue-property-decorator";
import {lotsModule, usersModule} from "../store/store";

export default class feedLotsList extends Vue{
  mounted() {
    lotsModule.fetchLots()
  }
  get lots() {
    return lotsModule.getLots
  }
}
</script>
