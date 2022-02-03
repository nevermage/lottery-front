<template>
  <div class="lotPageContainer">
    edit page
  </div>
</template>

<script lang="ts">
import {Prop, Vue} from "vue-property-decorator";

export default class lotPageEdit extends Vue {

  @Prop(Object) lot: object
}


</script>