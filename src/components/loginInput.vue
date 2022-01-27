<template>
  <input :value="modelValue" @input="update" class="loginFormInput" type="text">
</template>

<script>
export default {
  name: 'login-input',
  props: {
    modelValue: String
  },
  methods: {
    update(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  }
}
</script>