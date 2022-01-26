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
        <win-raw
            v-for="(data, index) in winners"
            :key="index"
            :data="data"
        />
      </table>
    </div>
  </main>
</template>

<script>
import WinRaw from "../components/winRaw";
export default {
  components: {WinRaw},
  mounted() {
    this.$store.dispatch('fetchWinners', this.$route.params.id);
  },
  computed: {
    winners() {
      return this.$store.getters.getWinners;
    },
  }
}
</script>
