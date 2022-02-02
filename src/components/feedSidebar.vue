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

<script lang="ts">
import {Vue} from "vue-property-decorator";
import {usersModule} from "../store/store";

export default class feedSidebar extends Vue{
  mounted() {
    usersModule.fetchWinners()
  }

  get winners() {
    return usersModule.getWinners
  }
}
</script>
