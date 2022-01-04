import Vue from "vue";

import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lots: [
    ],
    users: []
  },

  getters: {
    getLots: (state) => state.lots,
    getUsers: (state) => state.users,
  },
  actions: {
    fetchLots: async (context) => {
      const responce = await fetch('/api/getlots');
      let lots = await responce.json();
      console.log(lots);
      context.commit('addLotsToState', lots.data);
    },
    fetchUsers: async (context) => {
      const responce = await fetch('/api/getusers');
      let users = await responce.json();
      console.log(users);
      context.commit('addUsersToState', users.data);
    }
  },

  mutations: {
    addLotsToState: (state, lots) => {
      state.lots = lots;
    },
    addUsersToState: (state, users) => {
      state.users = users;
    }
  },
});
