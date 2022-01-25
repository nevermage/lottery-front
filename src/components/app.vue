<template>
  <div>
    <transition name="fade">
      <authorization-form
        v-if="isFormVisible"
        @close="closeForm"
      />
    </transition>

    <my-header @show="showForm"/>

    <transition name="fade" mode="in-out">
      <router-view></router-view>
    </transition>

    <my-footer/>
  </div>
</template>

<script>
import AuthorizationForm from "./authorizationForm";
import MyFooter from "./myFooter";
import MyHeader from "./myHeader";

export default {
  components: {
    MyHeader,
    MyFooter,
    AuthorizationForm,
  },
  data() {
    return {
      isFormVisible: false,
      formType: 1
    }
  },
  methods: {
    showForm() {
      this.isFormVisible = true;
    },
    closeForm() {
      this.isFormVisible = false;
    },
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .16s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>