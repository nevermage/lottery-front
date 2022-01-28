<template>
  <aside>
    <div class="sidebarHead">
      <strong>
        <router-link :to="{name: 'winners'}">Recent winners</router-link>
      </strong>
    </div>
    <li class="winnersList">
      <ul
        v-for="(winner, index) in winners"
        :key="index"
      >
        {{ winner.name }}
      </ul>
    </li>
  </aside>
</template>

<script>
export default {
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
