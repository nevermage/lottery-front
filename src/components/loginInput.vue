<template>
  <input
    :value="modelValue"
    class="loginFormInput"
    type="text"
    @input="update"
  >
</template>

<script lang="ts">
import {Prop, Vue, Emit} from "vue-property-decorator";

export default class loginInput extends Vue {
  @Prop (String) modelValue: String

  @Emit('update:modelValue')
  update(event) {
    return event.target.value
  }
}
</script>