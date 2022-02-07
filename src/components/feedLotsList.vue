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
        <router-link :to="{name: 'create-lot'}">
          Create lot +
        </router-link>
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
import {lotsModule} from "../store/store";

export default class feedLotsList extends Vue{
  mounted() {
    lotsModule.fetchLots()
  }
  get lots() {
    return lotsModule.getLots
  }
}
</script>

<style scoped>

.lotsContainerHead a{
  margin-right: 20px;
  float: right;
  color: #f5f5f5;
  text-decoration: none;
}

.lotsContainerHead a:hover {
  color: #ddd;
  transition: .15s;
}

</style>