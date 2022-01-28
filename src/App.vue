<template>
  <div>
    <transition name="fade">
      <authorization-form
        v-if="isFormVisible"
        @close="closeForm"
      />
    </transition>

    <my-header
      v-if="$route.meta.hideLayout == null"
      @show="showForm"
    />

    <router-view v-slot="{ Component }">
      <transition
        name="fade"
        mode="in-out"
      >
        <component :is="Component" />
      </transition>
    </router-view>

    <my-footer v-if="$route.meta.hideLayout == null" />
  </div>
</template>

<script>
import AuthorizationForm from "./components/authorizationForm";
import MyFooter from "./components/myFooter";
import MyHeader from "./components/myHeader";

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
    }
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .19s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

</style>