<template>
  <header>
    <div class="headerContent">
      <router-link :to="{name: 'feed'}" id="headerLogo">Lottery</router-link>
      <input class="searchField" type="text" v-model="query"
             @focus="searchActive = true" @blur="searchActive = false">
      <div class="searcher" id="staggered-list-demo">
        <transition-group
            name="staggered-fade"
            tag="ul"
            v-bind:css="false"
            v-on:before-enter="beforeEnter"
            v-on:enter="enter"
            v-on:leave="leave"
        >
          <li
              v-for="(lot, index) in computedList"
              v-bind:key="lot.name"
              v-bind:data-index="index"
          >
            <router-link
                class="searchLink"
                :to="{name: 'lot', params: {id: lot.id}}"
            >{{ lot.name }}</router-link>
          </li>
        </transition-group>
      </div>
      <router-link v-if="user.role_id == 2" :to="{name: 'admin'}" class="headerLoginButton">Admin</router-link>
      <router-link v-if="user.role_id" :to="{name: 'profile', params: {id: user.id}}" class="headerLoginButton">{{ user.name }}</router-link>
      <a v-if="user === 'UnAuthenticated'" class="headerLoginButton" @click="show">Log in</a>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      query: '',
      searchActive: false,
    }
  },
  mounted() {
    this.$store.dispatch('fetchUserInfo');
  },
  computed: {
    lots() {
      return this.$store.getters.getLots;
    },
    user() {
      return this.$store.getters.getUserInfo;
    },
    computedList: function () {
      var vm = this;
      return this.lots.filter(function (lot) {
        if (vm.query !== '') {
          return lot.name.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1
        }
      })
    }
  },
  methods: {
    show() {
      this.$emit('show')
    },
    beforeEnter: function (el) {
      el.style.opacity = 0
      el.style.height = 0
    },
    enter: function (el, done) {
      var delay = el.dataset.index * 150
      setTimeout(function () {
        Velocity(
            el,
            { opacity: 1, height: '1.6em' },
            { complete: done }
        )
      }, delay)
    },
    leave: function (el, done) {
      var delay = el.dataset.index * 150
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
