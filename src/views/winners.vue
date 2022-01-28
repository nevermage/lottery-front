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
          :data="data"
        />
      </table>
    </div>
  </main>
</template>

<script>
import winnersListItem from "../components/winnersListITem";

export default {
  components: { winnersListItem },
  computed: {
    winners() {
      return this.$store.getters.getWinners;
    },
  },
  mounted() {
    this.$store.dispatch('fetchWinners', this.$route.params.id);
  }
}
</script>
