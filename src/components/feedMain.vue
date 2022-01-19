<template>
  
    <main>
        <div class="feedBanner">
            <img src="/src/images/banner1.png" alt="">
        </div>
        <div class="lotsContainer">
            <div class="lotsContainerHead">
                <strong>Lots to play</strong>
            </div>
            <li class="lotGrid">
                <lot v-for="lot in lots"
                     :key="lot.id"
                     :lot="lot"
                ></lot>

            </li>
        </div>
    </main>
</template>

<script>
import lot from './lotCard';

export default {
    components: {
        lot,
    },
    mounted() {
        this.$store.dispatch('fetchLots');
        this.$store.dispatch('fetchUsers');
    },
    computed: {
        lots() {
            return this.$store.getters.getLots;
        },
        users() {
            return this.$store.getters.getUsers;
        }
    }
};
</script>
