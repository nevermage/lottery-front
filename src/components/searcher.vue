<template>
  <div class="searcher" id="staggered-list-demo">
    <input
        class="searchField" type="text" v-model="query"
        @focus="searchActive = true" @blur="searchActive = false"
    />
    <transition-group
        name="staggered-fade"
        tag="ul"
        v-bind:css="false"
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:leave="leave"
    >
      <div v-if="searchActive">
        <li
            v-for="(lot, index) in computedList"
            v-bind:key="lot.name"
            v-bind:data-index="index"
        >
          <router-link
              class="searchLink"
              :to="{name: 'lot', params: {id: lot.id}}"
          >{{ lot.name }}
          </router-link>
        </li>
      </div>

    </transition-group>
  </div>
</template>

<script>
import Velocity from 'velocity-animate';
export default {
  data() {
    return {
      query: '',
      searchActive: false,
    }
  },
  computed: {
    lots() {
      return this.$store.getters.getLots;
    },
    computedList: function () {
      const vm = this;
      return this.lots.filter(function (lot) {
        if (vm.query !== '') {
          return lot.name.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1
        }
      })
    }
  },
  methods: {
    beforeEnter: function (el) {
      el.style.opacity = 0
      el.style.height = 0
    },
    enter: function (el, done) {
      const delay = el.dataset.index * 150
      setTimeout(function () {
        Velocity(
            el,
            { opacity: 1, height: '1.6em' },
            { complete: done }
        )
      }, delay)
    },
    leave: function (el, done) {
      const delay = el.dataset.index * 150
      setTimeout(function () {
        Velocity(
            el,
            { opacity: 0, height: 0 },
            { complete: done }
        )
      }, delay)
    }
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
