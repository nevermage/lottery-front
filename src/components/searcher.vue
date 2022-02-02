<template>
  <div
    id="staggered-list-demo"
    class="searcher"
  >
    <input
      v-model="query"
      class="searchField"
      type="text"
      @focus="searchActive = true"
      @blur="searchActive = false"
    >
    <transition-group
      name="staggered-fade"
      tag="ul"
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <div v-if="searchActive">
        <li
          v-for="(lot, index) in searchResults"
          :key="lot.name"
          :data-index="index"
        >
          <router-link
            class="searchLink"
            :to="{name: 'lot', params: {id: lot.id}}"
          >
            {{ lot.name }}
          </router-link>
        </li>
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts">
import Velocity from "velocity-animate";
import {lotsModule} from "../store/store";
import {Vue} from "vue-property-decorator";

export default class searcher extends Vue {
  query: string = ''
  searchActive: boolean = false

  beforeEnter(el) {
    el.style.opacity = 0
    el.style.height = 0
  }
  enter(el, done) {
    el.style.opacity = 1;
    el.style.height = '1.6em';
    // const delay = el.dataset.index * 150
    // setTimeout(function () {
    //   Velocity(
    //       el,
    //       { opacity: 1, height: '1.6em' },
    //       { complete: done }
    //   )
    // }, delay)
  }
  leave(el, done) {
    el.style.opacity = 0;
    el.style.height = 0;
    // const delay = el.dataset.index * 150
    // setTimeout(function () {
    //   Velocity(
    //       el,
    //       { opacity: 0, height: 0 },
    //       { complete: done }
    //   )
    // }, delay)
  }

  get lots() {
    return lotsModule.getLots
  }

  get searchResults() {
    const vm = this;
    return this.lots['filter'](function (lot) {
      if (vm.query !== '') {
        return lot.name.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1
      }
    })
  }
}
</script>

<style>
.searchField {
  display: inline-block;
  height: 38px;
  vertical-align: top;
  margin-top: 16px;
  border-radius: 10px;
  border: 1px solid #7b7b7b;
  font-size: 22px;
  padding-left: 10px;
}

.searcher {
  display: inline-block;
  z-index: 100;
}

.searcher a {
  color: #494949;
}

</style>
