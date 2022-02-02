<template>
  <tr>
    <td>
      <router-link
        :to="{name: 'profile', params: {id: winner.id}}"
      >
        {{ winner.name }},
      </router-link>
    </td>
    <td class="lotteryRightCell">
      <div class="rightCellContainer">
        <div class="lotteryCellImageContainer">
          <img
            src=""
            alt=""
          >
        </div>
        <router-link
          :to="{name: 'lot', params: {id: winner.lid}}"
        >
          {{ winner.lot }},
        </router-link>
      </div>
    </td>
  </tr>
</template>

<script lang="ts">
import {Prop, Vue} from "vue-property-decorator";

export default class winnersListItem extends Vue {
  @Prop (Object) winner: object
}
</script>