import VueCookies from "vue-cookies";

export default {

    state: {
        url: process.env.VUE_APP_BACKEND_URL,
        users: [],
        user: [],
        winners: [],
        userInfo: []
    },

    getters: {
        getUsers: (state) => state.users,
        getUser: (state) => state.user,
        getWinners: (state) => state.winners,
        getUserInfo: (state) => state.userInfo,
    },
    actions: {
        fetchUsers: async ({commit, state}) => {
            const response = await fetch(state.url + '/api/users');
            let users = await response.json();
            commit('addUsersToState', users);
        },
        fetchWinners: async ({commit, state}) => {
            const response = await fetch(state.url + '/api/winners');
            let users = await response.json();
            commit('addWinnersToState', users);
        },
        fetchUser: async ({commit, state}, id) => {
            const response = await fetch(state.url + '/api/user/' + id);
            let user = await response.json();
            commit('addUserToState', user)
        },
        fetchUserInfo: async ({commit, state}) => {
            let token = VueCookies.get('token');
            if (token == null) {
                commit('addUserInfo', 'UnAuthenticated');
                return;
            }
            const headers = { "Authorization": 'Bearer ' + token };
            const response = await fetch(state.url + '/api/check-user', { headers });
            let user = await response.json();
            commit('addUserInfo', user)
        },
    },

    mutations: {
        addUsersToState: (state, users) => {
            state.users = users;
        },
        addWinnersToState: (state, users) => {
            state.winners = users;
        },
        addUserToState: (state, user) => {
            state.user = user;
        },
        addUserInfo: (state, user) => {
            state.userInfo = user;
        }
    }

}
