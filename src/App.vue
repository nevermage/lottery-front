<template>
  <div>
    <transition name="fade">
      <authorization-form
        v-if="isFormVisible"
        @close="closeForm"
      />
    </transition>

    <my-header
      v-if="$route.meta.hideLayout === undefined"
      @show="showForm"
    />

    <router-view v-slot="{ Component }">
      <transition
        name="fade"
        mode="out-in"
      >
        <component :is="Component" />
      </transition>
    </router-view>

    <my-footer v-if="$route.meta.hideLayout === undefined" />
  </div>
</template>

<script lang="ts">
import {Vue} from "vue-property-decorator";

export default class app extends Vue {
  isFormVisible: boolean = false
  formType: number = 1

  showForm() {
      this.isFormVisible = true;
  }

  closeForm() {
    this.isFormVisible = false;
  }
}


// export default({
//   components: {
//     MyHeader,
//     MyFooter,
//     AuthorizationForm,
//   },
//   data() {
//     return {
//       isFormVisible: false,
//       formType: 1
//     }
//   },
//   methods: {
//     showForm() {
//       this.isFormVisible = true;
//     },
//     closeForm() {
//       this.isFormVisible = false;
//     }
//   }
// });
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .19s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

</style>