<template>
  <ul class="lotGridCard">
    <div class="lotGridCardImgContainer">
      <img
        src=""
        alt="lot image"
      >
    </div>
    <div class="lotGridCardInfo">
      <strong>{{ lot.name }}</strong>
      <div class="lotGridCardInfoBot">
        <p>by {{ lot.creator }}</p>
        <router-link :to="{name: 'lot', params: {id: lot.id}}">
          Join
        </router-link>
      </div>
    </div>
  </ul>
</template>

<script lang="ts">
import { Vue, Prop } from 'vue-property-decorator'

export default class lotCard extends Vue {
  @Prop (Object) lot: object
}

</script>
