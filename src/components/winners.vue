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
                <tr
                    v-for="data in winners"
                >
                    <td>
                      <router-link
                          :to="{name: 'profile', params: {id: data.id}}">
                        {{ data.name }},
                      </router-link>
                    </td>
                    <td class="lotteryRightCell">
                        <div class="rightCellContainer">
                            <div class="lotteryCellImageContainer">
                                <img src="" alt="">
                            </div>
                          <router-link
                              :to="{name: 'lot', params: {id: data.lid}}">
                            {{ data.lot }},
                          </router-link>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </main>
</template>

<script>
export default {
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
