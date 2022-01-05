<template>
    <aside>
        <div class="sidebarHead">
            <strong>Recent winners</strong>
        </div>
        <li class="winnersList">
            <ul v-for="winner in winners">
              {{ winner.name }}
            </ul>
        </li>
    </aside>
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
