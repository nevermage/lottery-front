
import Vue from "vue";
import Vuex from "vuex";
import VueCookies from "vue-cookies";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lots: [],
    users: [],
    lot: [],
    user: [],
    own: [],
    won: [],
    winners: [],
    userInfo: []
  },

  getters: {
    getLots: (state) => state.lots,
    getUsers: (state) => state.users,
    getLot: (state) => state.lot,
    getUser: (state) => state.user,
    getOwn: (state) => state.own,
    getWon: (state) => state.won,
    getWinners: (state) => state.winners,
    getUserInfo: (state) => state.userInfo,
  },
  actions: {
    fetchLots: async (context) => {
      const response = await fetch('http://localhost/api/lots');
      let lots = await response.json();
      context.commit('addLotsToState', lots);
    },
    fetchLot: async ({commit}, id) => {
      const response = await fetch('http://localhost/api/lot/' + id);
      let lot = await response.json();
      commit('addLotToState', lot[0])
    },
    fetchUsers: async (context) => {
      const response = await fetch('http://localhost/api/users');
      let users = await response.json();
      context.commit('addUsersToState', users);
    },
    fetchWinners: async (context) => {
      const response = await fetch('http://localhost/api/winners');
      let users = await response.json();
      context.commit('addWinnersToState', users);
    },
    fetchUser: async ({commit}, id) => {
      const response = await fetch('http://localhost/api/user/' + id);
      let user = await response.json();
      commit('addUserToState', user)
    },
    fetchOwn: async ({commit}, id) => {
      const response = await fetch('http://localhost:80/api/lots-created-by/' + id);
      let lots = await response.json();
      commit('addOwnToState', lots)
    },
    fetchWon: async ({commit}, id) => {
      const response = await fetch('http://localhost:80/api/lots-won-by/' + id);
      let lots = await response.json();
      commit('addWonToState', lots)
    },
    fetchUserInfo: async ({commit}) => {
      let token = VueCookies.get('token');
      if (token == null) {
        commit('addUserInfo', 'UnAuthenticated');
        return;
      }
      const headers = { "Authorization": 'Bearer ' + token };
      const response = await fetch('http://localhost:80/api/check-user', { headers });
      let user = await response.json();
      commit('addUserInfo', user.data)
    },
  },

  mutations: {
    addLotsToState: (state, lots) => {
      state.lots = lots;
    },
    addLotToState: (state, lot) => {
      state.lot = lot;
    },
    addUsersToState: (state, users) => {
      state.users = users;
    },
    addWinnersToState: (state, users) => {
      state.winners = users;
    },
    addUserToState: (state, user) => {
      state.user = user;
    },
    addOwnToState: (state, lots) => {
      state.own = lots;
    },
    addWonToState: (state, lots) => {
      state.won = lots;
    },
    addUserInfo: (state, user) => {
      state.userInfo = user;
    },
  },
});
