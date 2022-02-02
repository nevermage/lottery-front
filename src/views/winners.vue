<template>
  <main>
    <div class="winnersPageContainer">
      <div class="winnersPageContainerHead">
        <strong>CONGRATULATIONS FOR OUR WINNERS!</strong>
      </div>
      <table class="winnersList">
        <tr>
          <th>Winner</th>
          <th>Lottery</th>
        </tr>
        <winners-list-item
          v-for="(data, index) in winners"
          :key="index"
          :winner="data"
        />
      </table>
    </div>
  </main>
</template>

<script lang="ts">
import {Vue} from "vue-property-decorator";
import {usersModule} from "../store/store";

export default class winners extends Vue {
  mounted() {
    usersModule.fetchWinners()
  }

  get winners() {
    return usersModule.getWinners
  }
}
</script>
