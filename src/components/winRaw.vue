<template>
  <tr>
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
</template>

<script>

export default {
  props: {
    data: {
      Type: "Array",
      required: true,
    }
  }
}
</script>