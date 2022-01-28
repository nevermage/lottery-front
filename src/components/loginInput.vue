<template>
  <input
    :value="modelValue"
    class="loginFormInput"
    type="text"
    @input="update"
  >
</template>

<script>
export default {
  name: 'LoginInput',
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  methods: {
    update(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  }
}
</script>